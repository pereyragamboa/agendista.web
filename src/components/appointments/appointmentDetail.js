import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import * as CalendarInput from '../commons/forms/calendarInput';
import * as Paths from '../../constants/paths';
import AppointmentCustomerSelector from './appointmentCustomerSelector';
import FeatherInput from "../commons/forms/featherInput";
import getDetail from '../commons/getDetail';
import ErrorPanel from '../commons/errorPanel'
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from "../commons/loadingPanel";

/**
 * Detail form for creating or editing appointments.
 *
 * @param props
 * @return {*}
 * @constructor
 */
export default function AppointmentDetail(props) {
  const detailBody = class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        totalPrice: 0,
        totalDuration: 0
      };
    }

    onServiceChecked(e, price, duration) {
      let diffPrice, diffDuration;
      if (e.target.checked) {
        diffPrice = price;
        diffDuration = duration;
      } else {
        diffPrice = -price;
        diffDuration = -duration;
      }
      this.setState({
        totalPrice: this.state.totalPrice + diffPrice,
        totalDuration: this.state.totalDuration + diffDuration
      });
    }

    render() {
      return <form>
        <h2 className="subtitle">Cliente</h2>
        <AppointmentCustomerSelector/>
        <FeatherInput caption="Cliente" iconName="user" placeholder="Nombre del cliente"/>
        <h2 className="subtitle">Detalle de la cita</h2>
        <div className="columns">
          <div className="column">
            <fieldset className="field">
              <label className="label">Servicios disponibles</label>
              {
                this.props.services.map(service =>
                    <div key={service.id} className="control">
                      <div className="checkbox">
                        <input type="checkbox" value={service.id}
                               onChange={e => this.onServiceChecked(e, service.price, service.duration)}/>
                        {service.description}
                      </div>
                    </div>
                )
              }
            </fieldset>
            {
              this.state.totalPrice === 0 ?
                <section className="message is-danger">
                  <p className="message-body">Seleccione al menos un servicio.</p>
                </section> :
                <section className="message is-info">
                  <div className="message-body">
                    <p>Costo: <strong>${this.state.totalPrice}</strong></p>
                    <p>Tiempo: <strong>{this.state.totalDuration} min</strong></p>
                  </div>
                </section>
            }
          </div>
          <div className="column">
            <CalendarInput.CalendarInput caption="Fecha" iconName="calendar"/>
          </div>
          <div className="column">
            <FeatherInput type="time" caption="Hora" iconName="clock"/>
          </div>
        </div>
      </form>;
    }

    componentDidMount() {
      CalendarInput.attachCalendars();
    }
  };

  const { error, loading, data } = useQuery(gql`
      query { getProfile(profileId: "0x30001") {
          services {
              id
              description
              duration
              price
          }
      }}
  `);
  if (loading) return <LoadingPanel subject="datos de cita"/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;

  const AppointmentDetail = getDetail(detailBody);
  return <AppointmentDetail {...props} cancelPath={Paths.LIST_APPOINTMENTS} services={data.getProfile.services} />
}
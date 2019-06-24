import React from 'react';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';
import getDetail from '../commons/getDetail';
import getFormControl from '../commons/forms/getFormControl';
import * as Paths from '../../paths';
import './appointmentDetail.css';
import FeatherInput from "../commons/forms/featherInput";

export default function AppointmentDetail() {
  const Calendar =
    getFormControl(<input className="input" data-display-mode="inline" type="date"/>);

  const detailBody = class extends React.Component {
    render() {
      return <div>
        <h2 className="subtitle">Cliente</h2>
        <FeatherInput caption="Cliente" iconName="user" placeholder="Nombre del cliente"/>
        <h2 className="subtitle">Detalle de la cita</h2>
        <div className="columns">
          <div className="column">
            <fieldset className="field">
              <label className="label">Servicios disponibles</label>
              <div className="control">
                <div className="checkbox">
                  <input type="checkbox"/>Servicio 1
                </div>
              </div>
              <div className="control">
                <div className="checkbox">
                  <input type="checkbox"/><span>Servicio 2</span>
                </div>
              </div>
              <div className="control">
                <div className="checkbox">
                  <input type="checkbox"/><span>Servicio 3</span>
                </div>
              </div>
              <p className="help is-danger">Seleccione al menos un servicio.</p>
            </fieldset>
          </div>
          <div className="column">
            <Calendar caption="Fecha" iconName="calendar"/>
          </div>
          <div className="column">
            <FeatherInput type="time" caption="Hora" iconName="clock"/>
          </div>
        </div>
      </div>;
    }

    componentDidMount() {
      // Attaches date input to Bulma Calendar and configures it once the
      // component is mounted
      bulmaCalendar.attach("input[type='date']", {
        minDate: new Date(),

      });
    }
  };

  const AppointmentDetail = getDetail(detailBody);

  return <AppointmentDetail title="Nueva cita"
                            okCaption="Agendar"
                            cancelPath={Paths.HOME} />
}
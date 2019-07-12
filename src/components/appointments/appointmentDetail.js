import React from 'react';
import * as CalendarInput from '../commons/forms/calendarInput';
import * as Paths from '../../constants/paths';
import FeatherInput from "../commons/forms/featherInput";
import getDetail from '../commons/getDetail';

/**
 * Detail form for creating or editing appointments.
 *
 * @param props
 * @return {*}
 * @constructor
 */
export default function AppointmentDetail(props) {
  const detailBody = class extends React.Component {
    render() {
      return <form>
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

  const AppointmentDetail = getDetail(detailBody);

  return <AppointmentDetail {...props} cancelPath={Paths.LIST_APPOINTMENTS} />
}
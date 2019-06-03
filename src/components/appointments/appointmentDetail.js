import React from 'react';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';
import FeatherIcon from '../commons/featherIcon';
import getDetail from '../commons/getDetail';
import * as Paths from '../../paths';
import './appointmentDetail.css';

export default function AppointmentDetail() {
  const detailBody = class extends React.Component {
    render() {
      return <div>
        <h2 className="subtitle">Cliente</h2>
        <div className="field">
          <label className="label">Cliente</label>
          <div className="control has-icons-left">
            <input className="input" type="text" placeholder="Nombre completo del cliente"/>
            <span className="icon is-left"><FeatherIcon iconName="user"/></span>
          </div>
        </div>
        <div className="field">
          <label className="label">Teléfono</label>
          <div className="control has-icons-left">
            <input className="input" type="text" placeholder="Teléfono del cliente"/>
            <span className="icon is-left"><FeatherIcon iconName="phone"/></span>
          </div>
        </div>
        <div className="field">
          <label className="label">Correo electrónico</label>
          <div className="control has-icons-left">
            <input className="input" type="text" placeholder="ejemplo@ejemplo.com"/>
            <span className="icon is-left"><FeatherIcon iconName="at-sign"/></span>
          </div>
        </div>
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
            <div className="field">
              <label className="label">Fecha</label>
              <div className="control has-icons-left">
                <input className="input"
                       data-display-mode="inline"
                       type="date"
                />
                <span className="icon is-left"><FeatherIcon iconName="calendar"/></span>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Hora</label>
              <div className="control has-icons-left">
                <input className="input" type="time" placeholder="Hora"/>
                <span className="icon is-left"><FeatherIcon iconName="clock"/></span>
              </div>
            </div>
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
                            addCaption="Agendar"
                            cancelPath={Paths.HOME}
                            updateCaption="Reagendar" />
}
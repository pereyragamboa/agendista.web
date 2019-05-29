import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../FeatherIcon';
import FeatherIcon from "../FeatherIcon";

class AppointmentDetail extends Component {
  render() {
    return (
      <div>
        <h1 className="title">Nueva cita</h1>
        <div id="clientInfo" className="box">
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
        </div>
        <div id="appointmentInfo" className="box">
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
                  <input className="input" type="text" placeholder="Fecha"/>
                  <span className="icon is-left"><FeatherIcon iconName="calendar"/></span>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">Hora</label>
                <div className="control has-icons-left">
                  <input className="input" type="text" placeholder="Hora"/>
                  <span className="icon is-left"><FeatherIcon iconName="clock"/></span>
                </div>
            </div>
          </div>
          </div>
        </div>
        <div className="buttons">
          <button className="button is-primary">
            <FeatherIcon iconName="plus"/>
            <span>Agendar</span></button>
          <button className="button is-primary">
            <FeatherIcon iconName="edit-2"/>
            <span>Reagendar</span></button>
          <Link className="button" to="/">
            <FeatherIcon iconName="x"/>
            <span>Cancelar</span></Link>
        </div>
      </div>
    );
  }
}

export default AppointmentDetail;
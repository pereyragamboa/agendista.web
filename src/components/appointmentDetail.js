import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../FeatherIcon';
import FeatherIcon from "../FeatherIcon";

class AppointmentDetail extends Component {
  render() {
    return (
      <div>
        <h1 className="title">Nueva cita</h1>
        <div className="box">
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
        <div className="box">
          <h2 className="subtitle">Detalle de la cita</h2>
          <div className="field">
            <label className="label">Servicio</label>
            <div className="control has-icons-left">
              <div className="select">
                <select>
                  <option>Servicio 1</option>
                  <option>Servicio 2</option>
                  <option>Servicio 3</option>
                </select>
                <span className="icon is-left"><FeatherIcon iconName="shopping-bag"/></span>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Fecha</label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Fecha"/>
              <span className="icon is-left"><FeatherIcon iconName="calendar"/></span>
            </div>
          </div>
          <div className="field">
            <label className="label">Hora</label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Hora"/>
              <span className="icon is-left"><FeatherIcon iconName="clock"/></span>
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
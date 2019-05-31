import React, { Component } from 'react';
import AppointmentList from './appointmentList';
import FeatherIcon from '../commons/featherIcon';

export default class Appointments extends Component {
  render() {
    return <div id="appointmentMain">
      <h1 className="title">Citas</h1>
      <div className="box">
        <AppointmentList showButtons />
      </div>
      <div className="buttons">
        <button className="button">Nueva cita</button>
        <button className="button is-static"><strong>Filtrar</strong></button>
        <button className="button">Por usuario</button>
        <button className="button">Por fecha</button>
      </div>
    </div>
  }
};
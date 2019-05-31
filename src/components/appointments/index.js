import React, { Component } from 'react';
import AppointmentList from './appointmentList';
import FeatherButton from '../commons/featherButton';
import * as Paths from '../../paths';

export default class Appointments extends Component {
  render() {
    return <div id="appointmentMain">
      <h1 className="title">Citas</h1>
      <div className="box">
        <AppointmentList showButtons />
      </div>
      <div className="buttons">
        <FeatherButton caption="Nueva cita" featherIcon="plus"
                       to={Paths.ADD_APPOINTMENT}/>

        <FeatherButton className="is-static"
                       caption="Filtrar" featherIcon="filter" />
        <FeatherButton caption="Por usuario" featherIcon="user"/>
        <FeatherButton caption="Por fecha" featherIcon="clock"/>
      </div>
    </div>
  }
};
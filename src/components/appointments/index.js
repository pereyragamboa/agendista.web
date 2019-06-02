import React from 'react';
import { Link } from 'react-router-dom';
import AppointmentList from './appointmentList';
import FeatherIcon from '../commons/featherIcon';
import getIndex from '../commons/getIndex';
import * as Paths from '../../paths';

const NavbarEndItems = [
  <Link className="navbar-item" to={Paths.ADD_APPOINTMENT}>
    <FeatherIcon iconName="plus"/>
    <span>Nueva cita</span>
  </Link>,
  <div className="navbar-item has-dropdown is-hoverable">
      <div className="navbar-item">
      <FeatherIcon iconName="filter"/>
      <span>Filtrar</span>
  </div>
  <div className="navbar-dropdown">
      <div className="navbar-item">
      <FeatherIcon className="is-small is-hidden-mobile" iconName="user"/>
      <span>Por usuario</span></div>
  <div className="navbar-item">
      <FeatherIcon className="is-small is-hidden-mobile" iconName="clock"/>
      <span>Por fecha y hora</span></div>
  </div>
  </div>
];

export default function Appointments() {
  const AppointmentIndex = getIndex(<AppointmentList/>, { endItems: NavbarEndItems });

  return <AppointmentIndex brand="Citas" featherIcon="calendar" />;
}
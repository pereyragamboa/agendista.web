import React from 'react';
import AppointmentList from './appointmentList';
import getIndex from '../commons/getIndex';
import NavbarMenuItem from '../commons/navbarMenuItem';
import * as Paths from '../../paths';

const NavbarEndItems = [
  <NavbarMenuItem path={Paths.ADD_APPOINTMENT} featherIcon="plus" caption="Nueva cita"/>,
  <div className="navbar-item has-dropdown is-hoverable">
    <NavbarMenuItem featherIcon="filter" caption="Filtrar"/>
    <div className="navbar-dropdown">
      <NavbarMenuItem className="is-small" featherIcon="user" caption="Por usuario"/>
      <NavbarMenuItem className="is-small" featherIcon="clock" caption="Por fecha y hora"/>
    </div>
  </div>
];

export default function Appointments() {
  const AppointmentIndex = getIndex(<AppointmentList showButtons/>, { endItems: NavbarEndItems });

  return <AppointmentIndex brand="Citas" featherIcon="calendar" />;
}
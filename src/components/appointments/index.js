import React from 'react';
import AppointmentList from './appointmentList';
import getIndex from '../commons/getIndex';
import NavbarDropdown from '../commons/navbarDropdown';
import NavbarMenuItem from '../commons/navbarMenuItem';
import * as Paths from '../../constants/paths';

const NavbarEndItems = [
  <NavbarMenuItem path={Paths.ADD_APPOINTMENT} featherIcon="plus" caption="Nueva cita"/>,
  <NavbarDropdown featherIcon="filter" caption="Filtrar">
    <NavbarMenuItem className="is-small" featherIcon="user" caption="Por usuario"/>
    <NavbarMenuItem className="is-small" featherIcon="clock" caption="Por fecha y hora"/>
  </NavbarDropdown>
];

export default function Appointments() {
  const AppointmentIndex = getIndex(<AppointmentList showButtons/>, { endItems: NavbarEndItems });

  return <AppointmentIndex brand="Citas" featherIcon="calendar" />;
}
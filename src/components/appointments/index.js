import React from 'react';
import { APPOINTMENTS } from "../../constants/headers";
import AppointmentList from './appointmentList';
import getIndex from '../commons/getIndex';
import NavbarDropdown from '../commons/navbarDropdown';
import NavbarMenuItem from '../commons/navbarMenuItem';
import Pagination from '../commons/pagination';
import * as Paths from '../../constants/paths';

const indexContent = <React.Fragment>
  <AppointmentList showButtons />
  <Pagination page={4} pageCount={7}/>
</React.Fragment>;

const NavbarEndItems = <React.Fragment>
  <NavbarMenuItem path={Paths.ADD_APPOINTMENT} featherIcon="plus" caption="Nueva cita"/>,
  <NavbarDropdown featherIcon="filter" caption="Filtrar">
    <NavbarMenuItem className="is-small" featherIcon="user" caption="Por usuario"/>
    <NavbarMenuItem className="is-small" featherIcon="clock" caption="Por fecha y hora"/>
  </NavbarDropdown>
</React.Fragment>;

export default function Appointments() {
  const AppointmentIndex = getIndex(indexContent, { endItems: NavbarEndItems });

  return <AppointmentIndex brand={APPOINTMENTS} featherIcon="calendar" />;
}
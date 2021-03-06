import React from 'react';
import { APPOINTMENTS } from "../../constants/headers";
import AppointmentList from './appointmentList';
import getIndex from '../commons/getIndex';
import NavbarDropdown from '../commons/navbars/navbarDropdown';
import NavbarMenuItem from '../commons/navbars/navbarMenuItem';
import Pagination from '../commons/pagination';
import * as Paths from '../../constants/paths';

const indexContent = <React.Fragment>
  <AppointmentList showButtons />
  <Pagination page={4} pageCount={7}/>
</React.Fragment>;

const NavbarEndItems = <React.Fragment>
  <NavbarDropdown featherIcon="plus" caption="Nueva cita">
    <NavbarMenuItem path={Paths.SEARCH_CUSTOMER_FOR_APPOINTMENT} featherIcon="user-check" caption="Para cliente previo"/>
    <NavbarMenuItem path={Paths.ADD_CUSTOMER_FOR_APPOINTMENT} featherIcon="user-plus" caption="Para cliente nuevo"/>
  </NavbarDropdown>
  <NavbarDropdown featherIcon="filter" caption="Filtrar">
    <NavbarMenuItem className="is-small" featherIcon="user" caption="Por usuario"/>
    <NavbarMenuItem className="is-small" featherIcon="clock" caption="Por fecha y hora"/>
  </NavbarDropdown>
</React.Fragment>;

/**
 * Main appointments page.
 *
 * @return {*}
 * @constructor
 */
export default function Appointments() {
  const AppointmentIndex = getIndex(indexContent, { endItems: NavbarEndItems });

  return <AppointmentIndex brand={APPOINTMENTS} featherIcon="calendar" />;
}
import React from 'react';
import * as Headers from '../constants/headers';
import * as Paths from '../constants/paths';
import BurgerMenu from './commons/navbars/burgerMenu';
import NavbarDropdown from './commons/navbars/navbarDropdown';
import NavbarMenuItem from './commons/navbars/navbarMenuItem';

/**
 * Application header. It contains a navigation bar.
 *
 * @return {*}
 * @constructor
 */
export default function Header() {
  const MENU_ID = "ag-header-navbar-menu";

  return <div className="hero-head">
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <h1 className="navbar-item">
            <a className="title is-4" href={Paths.HOME}>Agendista</a>
          </h1>
          <BurgerMenu id="ag-header-burger-menu" target={MENU_ID} />
        </div>
        <div className="navbar-menu" id={MENU_ID}>
          <div className="navbar-end">
            <NavbarMenuItem path={Paths.LIST_APPOINTMENTS} featherIcon="calendar" caption={Headers.APPOINTMENTS}/>
            <NavbarMenuItem path={Paths.LIST_CUSTOMERS}
                        featherIcon="users" caption={Headers.CUSTOMERS}/>
            <NavbarMenuItem path={Paths.LIST_SERVICES} featherIcon="shopping-bag" caption={Headers.SERVICES}/>
            <NavbarDropdown featherIcon="clock" caption="Horarios">
              <NavbarMenuItem featherIcon="watch" caption={Headers.WORKING_HOURS} path={Paths.LIST_HOURS}/>
              <NavbarMenuItem featherIcon="flag" caption={Headers.HOLIDAYS} path={Paths.LIST_HOLIDAYS}/>
              <NavbarMenuItem featherIcon="sun" caption={Headers.LEAVE} path={Paths.LIST_LEAVES}/>
            </NavbarDropdown>
            <NavbarMenuItem featherIcon="settings" caption={Headers.SETTINGS} path={Paths.SETTINGS}/>
          </div>
        </div>
      </div>
    </nav>
  </div>
};
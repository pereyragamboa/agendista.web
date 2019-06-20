import React from 'react';
import * as Paths from "../paths";
import BurgerMenu from './commons/burgerMenu';
import NavbarMenuItem from './commons/navbarMenuItem';

export default function Header() {
  const MENU_ID = "ag-header-navbar-menu";

  return <div className="hero-head">
    <div className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title is-4">Agendista</h1>
          </div>
          <BurgerMenu id="ag-header-burger-menu" target={MENU_ID} />
        </div>
        <div className="navbar-menu" id={MENU_ID}>
          <div className="navbar-end">
            <NavbarMenuItem path={Paths.LIST_APPOINTMENTS} featherIcon="calendar" caption="Citas"/>
            <NavbarMenuItem path={Paths.LIST_CUSTOMERS}
                        featherIcon="users"
                        caption="Clientes"/>
            <NavbarMenuItem path={Paths.LIST_SERVICES} featherIcon="shopping-bag" caption="Servicios"/>
            <NavbarMenuItem featherIcon="clock" caption="Horarios"
                        path={Paths.LIST_HOURS}/>
            <NavbarMenuItem featherIcon="settings" caption="Opciones" path={Paths.SETTINGS}/>
          </div>
        </div>
      </div>
    </div>
  </div>
};
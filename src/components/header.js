import React from 'react';
import { Link } from 'react-router-dom';
import * as Paths from "../paths";
import BurgerMenu from './commons/burgerMenu';
import FeatherIcon from "./commons/featherIcon";

function NavbarLink(props) {
  return <Link className="navbar-item" to={props.path}>
    <FeatherIcon className="is-hidden-touch" iconName={props.featherIcon}/>
    <span>{props.caption}</span>
  </Link>

}

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
            <NavbarLink path={Paths.LIST_APPOINTMENTS} featherIcon="calendar" caption="Citas"/>
            <NavbarLink path={Paths.LIST_CUSTOMERS}
                        featherIcon="users"
                        caption="Clientes"/>
            <NavbarLink path={Paths.LIST_SERVICES} featherIcon="shopping-bag" caption="Servicios"/>
            <NavbarLink featherIcon="clock" caption="Horarios"
                        path={Paths.LIST_HOURS}/>
            <NavbarLink featherIcon="settings" caption="Configurar"/>

          </div>
        </div>
      </div>
    </div>
  </div>
};
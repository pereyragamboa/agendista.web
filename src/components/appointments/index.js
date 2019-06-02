import React from 'react';
import { Link } from 'react-router-dom';
import AppointmentList from './appointmentList';
import FeatherIcon from '../commons/featherIcon';
import * as Paths from '../../paths';

// The consts and onBurgerClick() are defined outside the exported class because
// we don't need to expose them

const NAVBAR_BURGER_ID = "navbarBurgerMenu";
const NAVBAR_MENU_ID = "navbarMenuId";

function onBurgerClick(e) {
  const menuElement = document.getElementById(NAVBAR_MENU_ID);
  e.target.classList.toggle("is-active");
  menuElement.classList.toggle("is-active");
}

export default class Appointments extends React.Component {
  render() {
    return <div id="appointmentMain">
      <h1 className="title">Citas</h1>
      <div>
      <nav className="navbar" role="navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <FeatherIcon iconName="calendar"/>
          </div>
          <div id={NAVBAR_BURGER_ID} className="navbar-burger"
               role="button" aria-label="button" aria-expanded="false"
               data-target={NAVBAR_MENU_ID}
               onClick={ onBurgerClick }>
            {
              [1, 2, 3].map(() => <span aria-hidden="true"/>)
            }</div>
        </div>
        <div id={NAVBAR_MENU_ID} className="navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item" to={Paths.ADD_APPOINTMENT}>
              <FeatherIcon iconName="plus"/>
              <span>Nueva cita</span>
            </Link>
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
          </div>
        </div>
      </nav>
      </div>
      <div className="box">
        <AppointmentList showButtons />
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
          <div className="pagination-previous"><FeatherIcon iconName="arrow-left"/>Anterior</div>
          <div className="pagination-next">Siguiente<FeatherIcon iconName="arrow-right"/></div>
          <ul className="pagination-list">
            <li><div className="pagination-link" aria-label="Goto page 1">1</div></li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            <li><div className="pagination-link is-hidden-mobile" aria-label="Goto page 5">5</div></li>
            <li><div className="pagination-link is-current" aria-label="Page 6" aria-current="page">6</div></li>
            <li><div className="pagination-link is-hidden-mobile" aria-label="Goto page 7">7</div></li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            <li><div className="pagination-link" aria-label="Goto page 11">11</div></li>
          </ul>
        </nav>
      </div>
    </div>
  }
};
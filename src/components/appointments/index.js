import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppointmentList from './appointmentList';
import FeatherButton from '../commons/featherButton';
import FeatherIcon from '../commons/featherIcon';
import * as Paths from '../../paths';

export default class Appointments extends Component {
  render() {
    return <div id="appointmentMain">
      <h1 className="title">Citas</h1>
      <div>
      <nav className="navbar" role="navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <FeatherIcon iconName="calendar"/>
          </div>
          <a className="navbar-burger"
             role="button" aria-label="button" aria-expanded="false"
             data-target="appointment-navbar">
            {
              [1, 2, 3].map(() => <span aria-hidden="true"/>)
            }</a>
        </div>
        <div id="appointment-navbar" className="navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item" to={Paths.ADD_APPOINTMENT}>
              <FeatherIcon iconName="plus"/>
              <span>Nueva cita</span>
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-item">
                <FeatherIcon iconName="filter"/>
                <span>Filtrar</span>
              </a>
              <div className="navbar-dropdown">
                <div className="navbar-item">
                  <FeatherIcon className="is-small" iconName="user"/>
                  <span>Por usuario</span></div>
                <div className="navbar-item">
                  <FeatherIcon className="is-small" iconName="clock"/>
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
          <a className="pagination-previous"><FeatherIcon iconName="arrow-left"/>Anterior</a>
          <a className="pagination-next">Siguiente<FeatherIcon iconName="arrow-right"/></a>
          <ul className="pagination-list">
            <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            <li><a className="pagination-link is-hidden-mobile" aria-label="Goto page 5">5</a></li>
            <li><a className="pagination-link is-current" aria-label="Page 6" aria-current="page">6</a></li>
            <li><a className="pagination-link is-hidden-mobile" aria-label="Goto page 7">7</a></li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            <li><a className="pagination-link" aria-label="Goto page 11">11</a></li>
          </ul>
        </nav>
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
import React from 'react';
import { Link } from 'react-router-dom';
import * as Paths from '../paths';
import AppointmentList from './appointments/appointmentList';
import getClassName from './commons/getClassName';
import FeatherIcon from './commons/featherIcon';

// Creates an appointment panel button.
const MainPanelButton = (props) => {
  // checks existence of props.featherIcon and creates tie icon if exists
  let icon =
      typeof props.featherIcon === 'string' ?
          <FeatherIcon iconName={props.featherIcon}/> : '';

  return (
      <Link className={getClassName("button level-item", props)}
            to={props.to}>
        {icon}
        <span>{props.caption}</span>
      </Link>)
};

// Creates a tool panel button.
const ToolPanelButton = (props) => (
    <button className={getClassName("button is-fullwidth", props)}>
      <FeatherIcon iconName={ props.featherIcon }/>
      <span>{ props.caption }</span>
    </button>
);

function Start()
{
  return (
      <div id="tiledMain" className="tile is-ancestor">
        { /* Next appointments */ }
        <div className="tile is-8 is-parent is-vertical">
          <h1 className="title tile is-child">Próximas citas</h1>
          <div className="tile is-child box">
            <AppointmentList showButtons={false} />
          </div>
          <div className="tile level">
            <MainPanelButton to={Paths.ADD_APPOINTMENT} featherIcon="plus" caption="Nueva cita"/>
            <div className="level-item"/>
            <MainPanelButton to={Paths.LIST_APPOINTMENTS} featherIcon="calendar" caption="Todas las citas"/>
          </div>
        </div>
        { /* Tool panel */ }
        <div className="tile is-4 is-parent is-vertical">
          <h1 className="subtitle tile is-child is-hidden-tablet">Herramientas</h1>
          <div className="tile is-child buttons">
            <ToolPanelButton className="is-primary" featherIcon="users" caption="Clientes"/>
            <ToolPanelButton className="is-primary" featherIcon="shopping-bag" caption="Servicios"/>
            <ToolPanelButton className="is-primary" featherIcon="clock" caption="Usuarios"/>
            <ToolPanelButton className="is-warning" featherIcon="settings" caption="Configurar"/>
          </div>
        </div>
      </div>
  );
}

export default Start;
import React from 'react';
import { Link } from 'react-router-dom';
import * as Paths from '../paths';
import FeatherIcon from '../FeatherIcon';

// Creates an appointment panel button.
const MainPanelButton = (props) => {
  let className = "button level-item";
  // checks existence of props.className and appends it
  if (typeof props.className === 'string') {
    className = [className, props.className].join(' ');
  }
  // checks existence of props.featherIcon and creates tie icon if exists
  let icon =
      typeof props.featherIcon === 'string' ?
          <FeatherIcon iconName={props.featherIcon}/> : '';

  return (
      <Link className={className} to={props.to}>
        {icon}
        <span>{props.caption}</span>
      </Link>)
};

// Creates a tool panel button.
// The <br/> is shown only on desktop.
// In mobile, the icon and the caption appear in the same line.
const ToolPanelButton = (props) => (
    <button className={"button tile is-child " + (props.className || '')}>
      <div>
        <FeatherIcon iconName={ props.featherIcon }/>
        <br className="is-hidden-touch"/>
        <span>{ props.caption }</span>
      </div>
    </button>
);

function Start()
{
  return (
      <div id="tiledMain" className="App tile is-ancestor">
        { /* Next appointments */ }
        <div className="tile is-8 is-parent is-vertical">
          <h1 className="title tile is-child">Próximas citas</h1>
          <div className="tile is-child box">
            <ul>
              <li>ABC</li>
              <li>DEF</li>
              <li>KLM</li>
              <li>XYZ</li>
            </ul>
          </div>
          <div className="tile level">
            <MainPanelButton to={Paths.ADD_APPOINTMENT} featherIcon="plus" caption="Nueva cita"/>
            <div className="level-item"/>
            <MainPanelButton featherIcon="calendar" caption="Todas las citas"/>
          </div>
        </div>
        { /* Tool panel */ }
        <h1 className="subtitle is-hidden-desktop">Herramientas</h1>
        <div className="tile is-4 is-parent is-vertical">
          <ToolPanelButton className="is-primary" featherIcon="users" caption="Clientes"/>
          <ToolPanelButton className="is-primary" featherIcon="shopping-bag" caption="Servicios"/>
          <ToolPanelButton className="is-primary" featherIcon="clock" caption="Usuarios"/>
          <ToolPanelButton className="is-warning" featherIcon="settings" caption="Configurar"/>
        </div>
      </div>
  );
}

export default Start;
import React from 'react';
import FeatherIcon from './FeatherIcon';
import './App.css';

const MainPanelButton = (props) => {
  let className = "button level-item";
  // checks existence of props.className and appends it
  if (typeof props.className === 'string') {
    className = [className, props.className].join(' ');
  }
  // checks existence of props.featherIcon and creates tie icon if exists
  let icon =
      typeof props.featherIcon === 'string' ?
      <span><FeatherIcon iconName={props.featherIcon}/>&nbsp;</span> : '';

  return (
      <button className={className}>
      {icon}
      <span>{props.caption}</span>
  </button>)
};

// Creates a tool panel button.
// The <br/> is shown only on desktop.
// The space is shown only on touch devices.
const ToolPanelButton = (props) => (
  <button className={"button tile is-child " + (props.className || '')}>
    <div>
      <FeatherIcon iconName={ props.featherIcon }/>
      <br className="is-hidden-touch"/>
      <span className="is-hidden-desktop">&nbsp;</span>
      <span>{ props.caption }</span>
    </div>
  </button>
);

function App()
{
  return (
    <div className="App hero is-fullheight">
      { /* Body */ }
      <div className="hero-body">
        <div className="container">
          <div id="tiledMain" className="tile is-ancestor">
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
                <MainPanelButton featherIcon="plus" caption="Nueva cita"/>
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
        </div>
      </div>

      { /* Footer */ }
      <div className="hero-foot has-background-light">
        <div className="container has-text-centered">
          <br/>
          <p>
            Hecho con&nbsp;
            <span role="img" aria-label="Corazón">&#x2764;&#xFE0F;</span> y&nbsp;
            <span role="img" aria-label="Café">&#x2615;</span> por&nbsp;
            <a href="https://github.com/pereyragamboa">Martín Pereyra</a>
          </p>
          <br/>
        </div>
      </div>
    </div>
  );
}

export default App;

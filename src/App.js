import React from 'react';
import FeatherIcon from './FeatherIcon';
import './App.css';

const SMALL_ICON_SIZE = 12;
const SmallFeatherIcon = (props) => FeatherIcon({
  ...props,
  width: SMALL_ICON_SIZE,
  height: SMALL_ICON_SIZE
});

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
                  <div className="level-item">
                    <button className="button is-flex">
                      <FeatherIcon iconName='plus'/>&nbsp;
                      <span>Nueva cita</span>
                    </button>
                  </div>
                  <div className="level-item">
                    <button className="button is-flex">
                      <FeatherIcon iconName='calendar'/>&nbsp;
                      <span>Ver todas las citas</span>
                    </button>
                  </div>
              </div>
            </div>
            { /* Tool panel */ }
            <div className="tile is-4 is-parent">
              <div className="tile is-vertical">
                <button className="button tile is-child">
                  <p><FeatherIcon iconName='users'/></p>
                  <p>Clientes</p>
                </button>
                <button className="button tile is-child">
                  <p><FeatherIcon iconName='shopping-bag'/></p>
                  <p>Servicios</p>
                </button>
                <button className="button tile is-child">
                  <p><FeatherIcon iconName='clock'/></p>
                  <p>Horarios de atención</p>
                </button>
                <button className="button tile is-child">
                  <p><FeatherIcon iconName='settings'/></p>
                  <p>Configurar</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      { /* Footer */ }
      <div className="hero-foot has-background-light">
        <div className="container has-text-centered">
          <br/>
          <p>
            Hecho con &#x2764;&#xFE0F; y &#x2615; por <a href="https://github.com/pereyragamboa">Martín Pereyra</a>
          </p>
          <br/>
        </div>
      </div>
    </div>
  );
}

export default App;

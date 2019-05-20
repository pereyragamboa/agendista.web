import React from 'react';
import FeatherIcon from './FeatherIcon';
import './App.css';

function App()
{
  return (
    <div className="App">
      <div className="columns">

        <div className="column is-three-fifths-desktop tile is-ancestor">
          <h1 className="title">Próximas citas</h1>
        </div>

        <div className="column is-two-fifths-desktop tile is-ancestor is-vertical">
          <div className="button is-primary tile is-child">
            <FeatherIcon iconName='calendar'/>
            <span>Citas</span>
          </div>
          <div className="button is-primary tile is-child">
            <FeatherIcon iconName='users'/>
            <p>Clientes</p>
          </div>
          <div className="button is-primary tile is-child">
            <FeatherIcon iconName='shopping-bag'/>
            <p>Servicios</p>
          </div>
          <div className="button is-primary tile is-child">
            <FeatherIcon iconName='clock'/>
            <p>Horarios de atención</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

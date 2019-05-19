import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="columns">
        <div className="column is-three-fifths-desktop">
          <h1 className="title">Próximas citas</h1>
        </div>
        <div className="column is-two-fifths-desktop tile is-ancestor is-vertical">
          <p className="button is-primary tile is-child">Citas</p>
          <p className="button is-primary tile is-child">Clientes</p>
          <p className="button is-primary tile is-child">Servicios</p>
          <p className="button is-primary tile is-child">Horarios de atención</p>
        </div>
      </div>
    </div>
  );
}

export default App;

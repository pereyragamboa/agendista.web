import React from 'react';
import * as Paths from '../paths';
import AppointmentList from './appointments/appointmentList';
import FeatherButton from './commons/featherButton';

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
            <FeatherButton className="level-item"
                           caption="Nueva cita" featherIcon="plus"
                           to={Paths.ADD_APPOINTMENT} />
            <div className="level-item"/>
            <FeatherButton className="level-item"
                           caption="Todas las citas" featherIcon="calendar"
                           to={Paths.LIST_APPOINTMENTS} />
          </div>
        </div>
        { /* Tool panel */ }
        <div className="tile is-4 is-parent is-vertical">
          <h1 className="subtitle tile is-child is-hidden-tablet">Herramientas</h1>
          <div className="tile is-child buttons">
            <FeatherButton className="is-fullwidth is-primary" featherIcon="users" caption="Clientes"/>
            <FeatherButton className="is-fullwidth is-primary" featherIcon="shopping-bag" caption="Servicios"/>
            <FeatherButton className="is-fullwidth is-primary" featherIcon="clock" caption="Usuarios"/>
            <FeatherButton className="is-fullwidth is-warning" featherIcon="settings" caption="Configurar"/>
          </div>
        </div>
      </div>
  );
}

export default Start;
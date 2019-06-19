import React from 'react';
import * as Paths from '../paths';
import AppointmentList from './appointments/appointmentList';
import FeatherButton from './commons/featherButton';

function Home()
{
  return (
    <div id="ag-start" className="columns">
      { /* Next appointments */ }
      <div className="column is-8 is-offset-2 is-parent is-vertical">
        <h1 className="title">Próximas citas</h1>
        <div className="box">
          <AppointmentList showButtons={false} />
        </div>
        <div className="level">
          <FeatherButton className="level-item is-primary"
                         caption="Nueva cita" featherIcon="plus"
                         to={Paths.ADD_APPOINTMENT} />
          <div className="level-item"/>
          <FeatherButton className="level-item is-primary"
                         caption="Todas las citas" featherIcon="calendar"
                         to={Paths.LIST_APPOINTMENTS} />
        </div>
      </div>
    </div>
  );
}

export default Home;
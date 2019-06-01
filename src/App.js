import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import * as Paths from './paths';
import AppointmentDetail from './components/appointments/appointmentDetail';
import Appointments from './components/appointments';
import Start from './components/start';
import './App.css';


function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route exact path={Paths.HOME} component={Start}/>
          <Route exact path={Paths.LIST_APPOINTMENTS} component={Appointments}/>
          <Route exact path={Paths.ADD_APPOINTMENT} component={AppointmentDetail}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

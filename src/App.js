import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Paths from './paths';
import AppointmentDetail from './components/appointments/appointmentDetail';
import Appointments from './components/appointments';
import Services from './components/services';
import ServiceDetail from './components/services/serviceDetail';
import Start from './components/start';
import './App.css';


function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route exact path={Paths.HOME} component={Start}/>
          <Route exact path={Paths.ADD_APPOINTMENT} component={AppointmentDetail}/>
          <Route exact path={Paths.ADD_SERVICE} component={ServiceDetail}/>
          <Route exact path={Paths.LIST_APPOINTMENTS} component={Appointments}/>
          <Route exact path={Paths.LIST_SERVICES} component={Services}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

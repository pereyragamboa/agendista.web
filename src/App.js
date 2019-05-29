import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import * as Paths from './paths';
import AppointmentDetail from './components/appointments/appointmentDetail';
import Start from './components/start';
import './App.css';


function App()
{
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Start}/>
          <Route exact path={Paths.ADD_APPOINTMENT} component={AppointmentDetail}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

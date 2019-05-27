import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Start from './components/start';
import AppointmentDetail from './components/appointmentDetail';
import './App.css';


function App()
{
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Start}/>
          <Route exact path='/appointments/add' component={AppointmentDetail}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

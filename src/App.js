import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Paths from './paths';
import AppointmentDetail from './components/appointments/appointmentDetail';
import Appointments from './components/appointments';
import BusinessHours from './components/businessHours';
import CustomerDetail from './components/customers/customerDetail';
import Customers from './components/customers';
import Footer from './components/footer';
import Services from './components/services';
import ServiceDetail from './components/services/serviceDetail';
import Start from './components/start';
import './App.css';


function App()
{
  return (
    <div className="App hero is-fullheight">
      <div className="hero-head"/>
      <BrowserRouter>
        <div className="hero-body">
          <div className="container">
            <Route exact path={Paths.HOME} component={Start}/>
            <Route exact path={Paths.ADD_APPOINTMENT} component={AppointmentDetail}/>
            <Route exact path={Paths.ADD_CUSTOMER} component={CustomerDetail}/>
            <Route exact path={Paths.ADD_SERVICE} component={ServiceDetail}/>
            <Route exact path={Paths.LIST_APPOINTMENTS} component={Appointments}/>
            <Route exact path={Paths.LIST_CUSTOMERS} component={Customers}/>
            <Route path={Paths.LIST_HOURS} component={BusinessHours}/>
            <Route exact path={Paths.LIST_SERVICES} component={Services}/>
          </div>
        </div>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

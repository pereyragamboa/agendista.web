import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Paths from './paths';
import AppointmentDetail from './components/appointments/appointmentDetail';
import Appointments from './components/appointments';
import BusinessHours from './components/businessHours';
import CustomerDetail from './components/customers/customerDetail';
import Customers from './components/customers';
import Footer from './components/footer';
import Header from './components/header';
import Home from './components/home';
import Services from './components/services';
import ServiceDetail from './components/services/serviceDetail';
import Settings from './components/settings';
import './App.css';


function App()
{
  return (
      <BrowserRouter>
    <div className="App hero is-fullheight">
      <Header/>
        <div className="hero-body">
          <div className="container">
            <Route exact path={Paths.HOME} component={Home}/>
            <Route exact path={Paths.ADD_APPOINTMENT} component={AppointmentDetail}/>
            <Route exact path={Paths.ADD_CUSTOMER} component={CustomerDetail}/>
            <Route exact path={Paths.ADD_SERVICE} component={ServiceDetail}/>
            <Route path={Paths.LIST_HOURS} component={BusinessHours}/>
            <Route exact path={Paths.LIST_APPOINTMENTS} component={Appointments}/>
            <Route exact path={Paths.LIST_CUSTOMERS} component={Customers}/>
            <Route exact path={Paths.LIST_SERVICES} component={Services}/>
            <Route exact path={Paths.SETTINGS} component={Settings}/>
          </div>
        </div>
      <Footer/>
    </div>
      </BrowserRouter>
  );
}

export default App;

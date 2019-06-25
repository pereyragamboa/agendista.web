import React from 'react';
import { Route } from 'react-router-dom';
import * as Paths from "./paths";
import Appointments from "./components/appointments";
import AppointmentDetail from "./components/appointments/appointmentDetail";
import BusinessHours from "./components/businessHours";
import Customers from "./components/customers";
import CustomerDetail from "./components/customers/customerDetail";
import Home from "./components/home";
import Settings from "./components/settings";
import Services from "./components/services";
import ServiceDetail from "./components/services/serviceDetail";

export default () =>
    <React.Fragment>
      <Route exact path={Paths.HOME} component={Home}/>
      <Route exact path={Paths.ADD_APPOINTMENT} component={AppointmentDetail}/>
      <Route exact path={Paths.ADD_CUSTOMER} component={CustomerDetail}/>
      <Route exact path={Paths.ADD_SERVICE} component={ServiceDetail}/>
      <Route path={Paths.LIST_HOURS} component={BusinessHours}/>
      <Route exact path={Paths.LIST_APPOINTMENTS} component={Appointments}/>
      <Route exact path={Paths.LIST_CUSTOMERS} component={Customers}/>
      <Route exact path={Paths.LIST_SERVICES} component={Services}/>
      <Route exact path={Paths.SETTINGS} component={Settings}/>
    </React.Fragment>;
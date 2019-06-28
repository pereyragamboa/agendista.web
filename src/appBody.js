import React from 'react';
import { Route } from 'react-router';
import * as Paths from "./constants/paths";
import Appointments from "./components/appointments";
import AppointmentDetail from "./components/appointments/appointmentDetail";
import BusinessHours from "./components/businessHours";
import Customers from "./components/customers";
import CustomerDetail from "./components/customers/customerDetail";
import Home from "./components/home";
import Settings from "./components/settings";
import Services from "./components/services";
import ServiceDetail from "./components/services/serviceDetail";

const NewAppointment = () =>
    <AppointmentDetail title="Nueva cita" okCaption="Agendar" />;
const EditAppointment = () =>
    <AppointmentDetail title="Reagendar cita" okCaption="Reagendar" />;
const NewCustomer = () => <CustomerDetail title="Nuevo cliente"/>;
const EditCustomer = () => <CustomerDetail title="Editar cliente" okCaption="Editar"/>;
const NewService = () => <ServiceDetail title="Nuevo servicio"/>;
const EditService = () => <ServiceDetail title="Editar servicio" okCaption="Editar"/>;

export default () => <React.Fragment>
  <Route exact path={Paths.HOME} component={Home}/>
  <Route exact path={Paths.ADD_APPOINTMENT} render={NewAppointment}/>
  <Route exact path={Paths.ADD_CUSTOMER} render={NewCustomer}/>
  <Route exact path={Paths.ADD_SERVICE} render={NewService}/>
  <Route path={Paths.LIST_HOURS} component={BusinessHours}/>
  <Route exact path={Paths.LIST_APPOINTMENTS} component={Appointments}/>
  <Route exact path={Paths.LIST_CUSTOMERS} component={Customers}/>
  <Route exact path={Paths.LIST_SERVICES} component={Services}/>
  <Route exact path={Paths.SETTINGS} component={Settings}/>
  <Route exact path={Paths.UPDATE_APPOINTMENT} render={EditAppointment}/>
  <Route exact path={Paths.UPDATE_CUSTOMER} render={EditCustomer}/>
  <Route exact path={Paths.UPDATE_SERVICE} render={EditService}/>
</React.Fragment>;
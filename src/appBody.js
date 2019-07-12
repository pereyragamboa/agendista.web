import React from 'react';
import { Route } from 'react-router';
import * as Paths from "./constants/paths";
import Appointments from "./components/appointments";
import AppointmentDetail from "./components/appointments/appointmentDetail";
import Customers from "./components/customers";
import CustomerDetail from "./components/customers/customerDetail";
import Home from "./components/home";
import {FixedHolidayDetail, VariableHolidayDetail} from './components/holidays/holidayDetail';
import HolidayList from './components/holidays/index';
import HourList from './components/businessHours/index';
import LeaveDetail from './components/leaves/leaveDetail';
import Index from './components/leaves/index';
import Settings from "./components/settings";
import Services from "./components/services";
import ServiceDetail from "./components/services/serviceDetail";

const NewAppointment = () =>
    <AppointmentDetail title="Nueva cita" okCaption="Agendar" />;
const EditAppointment = () =>
    <AppointmentDetail title="Reagendar cita" okCaption="Reagendar" />;
const NewCustomer = () => <CustomerDetail title="Nuevo cliente"/>;
const EditCustomer = () => <CustomerDetail title="Editar cliente" okCaption="Editar"/>;
const NewFixedHoliday = () => <FixedHolidayDetail title="Nuevo día feriado"/>;
const NewVariableHoliday = () => <VariableHolidayDetail title="Nuevo día feriado"/>;
const EditFixedHoliday = () => <FixedHolidayDetail title="Editar día feriado"/>;
const NewLeave = () => <LeaveDetail title="Nuevo periodo vacacional"/>;
const EditLeave = () => <LeaveDetail title="Editar periodo vacacional" okCaption="Editar"/>;
const NewService = () => <ServiceDetail title="Nuevo servicio"/>;
const EditService = () => <ServiceDetail title="Editar servicio" okCaption="Editar"/>;

export default class AppBody extends React.Component {
  render = () => <React.Fragment>
    <Route exact path={Paths.HOME} component={Home}/>
    <Route exact path={Paths.ADD_APPOINTMENT} render={NewAppointment}/>
    <Route exact path={Paths.ADD_CUSTOMER} render={NewCustomer}/>
    <Route exact path={Paths.ADD_FIXED_HOLIDAY} render={NewFixedHoliday}/>
    <Route exact path={Paths.ADD_LEAVE} render={NewLeave}/>
    <Route exact path={Paths.ADD_SERVICE} render={NewService}/>
    <Route exact path={Paths.ADD_VARIABLE_HOLIDAY} render={NewVariableHoliday}/>
    <Route exact path={`${Paths.LIST_HOLIDAYS}`} component={HolidayList}/>
    <Route exact path={`${Paths.LIST_HOLIDAYS}:year`} component={HolidayList}/>
    <Route exact path={Paths.LIST_LEAVES} component={Index}/>
    <Route exact path={Paths.LIST_HOURS} component={HourList}/>
    <Route exact path={Paths.LIST_APPOINTMENTS} component={Appointments}/>
    <Route exact path={Paths.LIST_CUSTOMERS} component={Customers}/>
    <Route exact path={Paths.LIST_SERVICES} component={Services}/>
    <Route exact path={Paths.SETTINGS} component={Settings}/>
    <Route exact path={Paths.UPDATE_APPOINTMENT} render={EditAppointment}/>
    <Route exact path={Paths.UPDATE_CUSTOMER} render={EditCustomer}/>
    <Route exact path={Paths.UPDATE_FIXED_HOLIDAY} render={EditFixedHoliday}/>
    <Route exact path={Paths.UPDATE_LEAVE} render={EditLeave}/>
    <Route exact path={Paths.UPDATE_SERVICE} render={EditService}/>
  </React.Fragment>;
}
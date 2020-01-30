import React from 'react';
import { Route } from 'react-router';
import * as Paths from "../constants/paths";
import { AddCustomerDetail, EditCustomerDetail } from "./customers/customerDetail";
import {
  AddFixedHolidayDetail, AddVariableHolidayDetail,
  EditFixedHolidayDetail, EditVariableHolidayDetail } from './holidays/holidayDetail';
import { AddLeaveDetail, EditLeaveDetail } from './leaves/leaveDetail';
import { AddServiceDetail, EditServiceDetail } from "./services/serviceDetail";
import AppointmentCustomerSelector from './appointments/appointmentCustomerSelector';
import Appointments from "./appointments/index";
import AppointmentDetail from "./appointments/appointmentDetail";
import Customers from "./customers/index";
import HolidayList from './holidays/index';
import Home from "./home";
import HourList from './businessHours/index';
import Index from './leaves/index';
import Settings from "./settings/index";
import Services from "./services/index";

const NewAppointment = () =>
    <AppointmentDetail title="Nueva cita" okCaption="Agendar" />;
const NewCustomerForAppointment = () => <AddCustomerDetail title="Nuevo cliente" forwardUrl={Paths.ADD_APPOINTMENT}/>;
const EditAppointment = (props) =>
    <AppointmentDetail title="Reagendar cita" okCaption="Reagendar" {...props} />;
const NewCustomer = () => <AddCustomerDetail title="Nuevo cliente" forwardUrl={Paths.LIST_CUSTOMERS}/>;
const EditCustomer = (props) =>
    <EditCustomerDetail title="Editar cliente" okCaption="Editar" {...props}/>;
const NewFixedHoliday = (props) => <AddFixedHolidayDetail title="Nuevo día feriado" {...props}/>;
const NewVariableHoliday = (props) => <AddVariableHolidayDetail title="Nuevo día feriado" {...props}/>;
const EditFixedHoliday = (props) => <EditFixedHolidayDetail title="Editar día feriado" {...props}/>;
const EditVariableHoliday = (props) => <EditVariableHolidayDetail title="Editar día feriado" {...props}/>;
const NewLeave = () => <AddLeaveDetail title="Nuevo periodo vacacional"/>;
const EditLeave = (props) => <EditLeaveDetail title="Editar periodo vacacional" okCaption="Editar" {...props}/>;
const NewService = () => <AddServiceDetail/>;
const EditService = (props) => <EditServiceDetail {...props}/>;

export default class AppBody extends React.Component {
  render = () => <React.Fragment>
    <Route exact path={Paths.HOME} component={Home}/>
    <Route exact path={`${Paths.ADD_APPOINTMENT}:customerId`} render={NewAppointment}/>
    <Route exact path={Paths.ADD_CUSTOMER} component={NewCustomer}/>
    <Route exact path={Paths.ADD_CUSTOMER_FOR_APPOINTMENT} render={NewCustomerForAppointment}/>
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
    <Route exact path={Paths.SEARCH_CUSTOMER_FOR_APPOINTMENT} component={AppointmentCustomerSelector}/>
    <Route exact path={Paths.SETTINGS} component={Settings}/>
    <Route exact path={`${Paths.UPDATE_APPOINTMENT}:id`} render={EditAppointment}/>
    <Route exact path={`${Paths.UPDATE_CUSTOMER}:id`} render={EditCustomer}/>
    <Route exact path={`${Paths.UPDATE_FIXED_HOLIDAY}:id`} render={EditFixedHoliday}/>
    <Route exact path={`${Paths.UPDATE_VARIABLE_HOLIDAY}:id`} render={EditVariableHoliday}/>
    <Route exact path={`${Paths.UPDATE_LEAVE}:id`} render={EditLeave}/>
    <Route exact path={`${Paths.UPDATE_SERVICE}:id`} render={EditService}/>
  </React.Fragment>;
}
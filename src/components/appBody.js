import React from 'react';
import { Route } from 'react-router';
import * as Paths from "../constants/paths";
import Appointments from "./appointments/index";
import AppointmentDetail from "./appointments/appointmentDetail";
import Customers from "./customers/index";
import { AddCustomerDetail, EditCustomerDetail } from "./customers/customerDetail";
import { AddServiceDetail, EditServiceDetail } from "./services/serviceDetail";
import Home from "./home";
import {FixedHolidayDetail, VariableHolidayDetail} from './holidays/holidayDetail';
import HolidayList from './holidays/index';
import HourList from './businessHours/index';
import LeaveDetail from './leaves/leaveDetail';
import Index from './leaves/index';
import Settings from "./settings/index";
import Services from "./services/index";

const NewAppointment = () =>
    <AppointmentDetail title="Nueva cita" okCaption="Agendar" />;
const EditAppointment = (props) =>
    <AppointmentDetail title="Reagendar cita" okCaption="Reagendar" {...props} />;
const NewCustomer = () => <AddCustomerDetail title="Nuevo cliente"/>;
const EditCustomer = (props) =>
    <EditCustomerDetail title="Editar cliente" okCaption="Editar" {...props}/>;
const NewFixedHoliday = () => <FixedHolidayDetail title="Nuevo día feriado"/>;
const NewVariableHoliday = () => <VariableHolidayDetail title="Nuevo día feriado"/>;
const EditFixedHoliday = () => <FixedHolidayDetail title="Editar día feriado"/>;
const NewLeave = () => <LeaveDetail title="Nuevo periodo vacacional"/>;
const EditLeave = () => <LeaveDetail title="Editar periodo vacacional" okCaption="Editar"/>;
const NewService = () => <AddServiceDetail/>;
const EditService = (props) => <EditServiceDetail {...props}/>;

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
    <Route exact path={`${Paths.UPDATE_APPOINTMENT}:id`} render={EditAppointment}/>
    <Route exact path={`${Paths.UPDATE_CUSTOMER}:id`} render={EditCustomer}/>
    <Route exact path={`${Paths.UPDATE_FIXED_HOLIDAY}:id`} render={EditFixedHoliday}/>
    <Route exact path={`${Paths.UPDATE_LEAVE}:id`} render={EditLeave}/>
    <Route exact path={`${Paths.UPDATE_SERVICE}:id`} render={EditService}/>
  </React.Fragment>;
}
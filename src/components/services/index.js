import React from 'react';
import AppointmentList from './serviceList';
import getIndex from '../commons/getIndex';
import NavbarMenuItem from "../commons/navbarMenuItem";
import * as Paths from "../../paths";

const NavbarEndItems =
  <NavbarMenuItem path={Paths.ADD_SERVICE} featherIcon="plus" caption="Nuevo servicio"/>;

export default function Services () {
  const ServiceIndex = getIndex(<AppointmentList/>, { endItems: NavbarEndItems });

  return <ServiceIndex brand="Servicios" featherIcon="shopping-bag"/>;
};
import React from 'react';
import ServiceList from './serviceList';
import getIndex from '../commons/getIndex';
import NavbarMenuItem from "../commons/navbarMenuItem";
import * as Paths from "../../constants/paths";

const NavbarEndItems =
  <NavbarMenuItem path={Paths.ADD_SERVICE} featherIcon="plus" caption="Nuevo servicio"/>;

export default function Services () {
  const ServiceIndex = getIndex(<ServiceList/>, { endItems: NavbarEndItems });

  return <ServiceIndex brand="Servicios" featherIcon="shopping-bag"/>;
};
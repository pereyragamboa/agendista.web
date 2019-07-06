import React from 'react';
import * as Paths from "../../constants/paths";
import getIndex from '../commons/getIndex';
import NavbarMenuItem from "../commons/navbarMenuItem";
import ServiceList from './serviceList';
import { SERVICES } from "../../constants/headers";

const NavbarEndItems =
  <NavbarMenuItem path={Paths.ADD_SERVICE} featherIcon="plus" caption="Nuevo servicio"/>;

export default function Services () {
  const ServiceIndex = getIndex(<ServiceList/>, { endItems: NavbarEndItems });

  return <ServiceIndex brand={SERVICES} featherIcon="shopping-bag"/>;
};
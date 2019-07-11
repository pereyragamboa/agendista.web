import React from 'react';
import * as Paths from "../../constants/paths";
import getIndex from '../commons/getIndex';
import NavbarMenuItem from "../commons/navbarMenuItem";
import ServiceList from './serviceList';
import { SERVICES } from "../../constants/headers";

const NavbarEndItems =
  <NavbarMenuItem path={Paths.ADD_SERVICE} featherIcon="plus" caption="Nuevo servicio"/>;

/**
 * Main services page.
 *
 * This page has no pagination component because it is assumed that the quantity of services will not
 * be much higher than 10, and very likely will never be close to 100; in other words, the entire list
 * of services should be browseable.
 *
 * @return {*}
 * @constructor
 */
export default function Services () {
  const ServiceIndex = getIndex(<ServiceList/>, { endItems: NavbarEndItems });

  return <ServiceIndex brand={SERVICES} featherIcon="shopping-bag"/>;
};
import React from 'react';
import { Link } from 'react-router-dom';
import getIndex from '../commons/getIndex';
import AppointmentList from '../appointments/appointmentList';
import FeatherIcon from '../commons/featherIcon';
import * as Paths from "../../paths";

const NavbarEndItems = [
  (<Link className="navbar-item" to={Paths.ADD_SERVICE}>
    <FeatherIcon iconName="plus"/>
    <span>Nuevo servicio</span>
  </Link>)
];

export default function Services () {
  const ServiceIndex = getIndex(<AppointmentList />, { endItems: NavbarEndItems });

  return <ServiceIndex brand="Servicios"/>;
};
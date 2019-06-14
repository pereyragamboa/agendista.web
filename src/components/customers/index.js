import React from 'react';
import { Link } from 'react-router-dom';
import * as Paths from '../../paths';
import getIndex from '../commons/getIndex';
import FeatherIcon from "../commons/featherIcon";
import showModal from '../commons/showModal';

const NavBarItems = [
  <Link key="ag-navbar-add" className="navbar-item" to={Paths.ADD_CUSTOMER}>
    <FeatherIcon iconName="plus"/>
    <span>Nuevo cliente</span>
  </Link>,
  <Link key="ag-navbar-search" className="link navbar-item" to="#" onClick={() => showModal("ag-modal-customer-search")}>
    <FeatherIcon iconName="search"/>
    <span>Buscar cliente</span>
  </Link>
];

export default function Customers(){
  const CustomerIndex = getIndex(<div/>, { endItems: NavBarItems });

  return <CustomerIndex brand="Clientes" featherIcon="users"/>
}
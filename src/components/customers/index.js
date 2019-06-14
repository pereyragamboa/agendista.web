import React from 'react';
import { Link } from 'react-router-dom';
import * as Paths from '../../paths';
import CustomerList from '../customers/customerList';
import FeatherIcon from "../commons/featherIcon";
import getIndex from '../commons/getIndex';

const NavBarItems = [
  <Link key="ag-navbar-add" className="navbar-item" to={Paths.ADD_CUSTOMER}>
    <FeatherIcon iconName="plus"/>
    <span>Nuevo cliente</span>
  </Link>,
  <div className="navbar-item field has-addons">
    <div className="control">
      <input className="input" type="text" placeholder="Buscar"/>
    </div>
    <div className="control">
      <button className="button">
        <FeatherIcon iconName="search" width="16" height="16"/>
      </button>
    </div>
  </div>
];

export default function Customers(){
  const CustomerIndex = getIndex(<CustomerList/>, { endItems: NavBarItems });

  return <CustomerIndex brand="Clientes" featherIcon="users"/>
}
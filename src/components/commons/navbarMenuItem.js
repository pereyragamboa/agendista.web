import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';

export default function NavbarMenuItem(props) {
  return <Link className="navbar-item" to={props.path}>
    <FeatherIcon className="is-hidden-touch" iconName={props.featherIcon}/>
    <span>{props.caption}</span>
  </Link>
}
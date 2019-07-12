import React from 'react';
import { NavLink } from 'react-router-dom';
import FeatherIcon from '../featherIcon';
import getClassName from '../../../utilities/getClassName';
import './navbarMenuItem.css';

/**
 * Element of a Bulma navbar menu.
 *
 * @param props.featherIcon name of Feather icon
 * @param props.onClick Click event manager
 * @param props.path Destination path; overrides props.onClick
 * @return {*} A <Link> element, if props.path is provided; else, a <div> element
 * @constructor
 */
export default function NavbarMenuItem(props) {
  const content = <React.Fragment>
    <FeatherIcon className={getClassName("is-hidden-touch", props)} iconName={props.featherIcon}/>
    &nbsp;
    <span>{props.caption}</span>
  </React.Fragment>;

  const elementClass = getClassName("navbar-item", props);

  return (props.path ?
      <NavLink className={elementClass} activeClassName={"has-background-dark has-text-light"} to={props.path}>{content}</NavLink> :
      <div className={elementClass} onClick={props.onClick}>{content}</div>);
}

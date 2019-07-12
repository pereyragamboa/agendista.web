import React from 'react';
import getClassName from '../../../utilities/getClassName';
import NavbarMenuItem from './navbarMenuItem';

/**
 *
 * @param props.featherIcon Name of Feather icon
 * @param props.caption Text of dropdown
 * @param props.children Zero or more NavbarMenuItems
 * @param props.id Identifier of the dropdown.
 * @return {*}
 * @constructor
 */
export default function NavbarDropdown(props) {
  const {featherIcon, caption, id, ...otherProps} = props;
  const className = getClassName("navbar-item navbar-link has-dropdown", props);
  // If props.id is not provided, use current time
  const dropdownId = `ag-navbar-dropdown-${id || Date.now()}`;

  function onDropdownClick() {
    document.getElementById(dropdownId).classList.toggle("is-active");
  }

  return <div id={dropdownId} className={className} {...otherProps} onClick={onDropdownClick}>
    <NavbarMenuItem featherIcon={featherIcon} caption={caption}/>
    <div className="navbar-dropdown">
      {props.children}
    </div>
  </div>;
}
import React from 'react';
import getClassName from '../commons/getClassName';
import NavbarMenuItem from './navbarMenuItem';

/**
 *
 * @param props.featherIcon Name of Feather icon
 * @param props.caption Text of dropdown
 * @param props.children Zero or more NavbarMenuItems
 * @return {*}
 * @constructor
 */
export default function NavbarDropdown(props) {
  const {featherIcon, caption, ...otherProps} = props;
  const className=getClassName("navbar-item has-dropdown is-hoverable", props);

  return <div className={className} {...otherProps}>
    <NavbarMenuItem featherIcon={featherIcon} caption={caption}/>
    <div className="navbar-dropdown">
      {props.children}
    </div>
  </div>;
}
import React from 'react';
import { NavLink } from 'react-router-dom';
import FeatherIcon from '../featherIcon';
import getClassName from '../../../utilities/getClassName';
import './navbarMenuItem.css';

/**
 * Element of a Bulma navbar menu.
 *
 * @param caption Content of the menu item.
 * @param featherIcon name of Feather icon
 * @param onClick Click event manager
 * @param path Destination path; overrides props.onClick
 * @param otherProps Rest of props passed to the component.
 * @return {*} A <Link> element, if props.path is provided; else, a <div> element
 * @constructor
 */
export default function NavbarMenuItem({ caption, featherIcon, onClick, path, ...otherProps }) {
  if (!featherIcon && !caption) {
    throw new Error("Missing both 'featherIcon' and 'caption' props. Specify at least one.")
  }
  const content = <React.Fragment>
    {
      featherIcon ? <FeatherIcon className={getClassName("is-hidden-touch", otherProps)} iconName={featherIcon}/> : ''
    }
    {
      // Shows a space between icon and caption
      featherIcon && caption ? <>&nbsp;</> : ''
    }
    <span>{caption}</span>
  </React.Fragment>;

  const elementClass = getClassName("navbar-item", otherProps);

  return (path ?
      <NavLink {...otherProps} className={elementClass} activeClassName={"has-background-dark has-text-light"} to={path}>{content}</NavLink> :
      <div {...otherProps} className={elementClass} onClick={onClick}>{content}</div>);
}

import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';
import getClassName from './getClassName';

/**
 * Element of a Bulma navbar menu.
 *
 * @param props.featherIcon name of Feather icon
 * @param props.path Destination path
 * @return {*} A <Link> or a <div> element, depending of path
 * @constructor
 */
export default function NavbarMenuItem(props) {
  const Content = () => <React.Fragment>
    <FeatherIcon className={getClassName("is-hidden-touch", props)} iconName={props.featherIcon}/>
    &nbsp;
    <span>{props.caption}</span>
  </React.Fragment>;

  const elementClass = getClassName("navbar-item", props);

  return (props.path ?
      <Link className={elementClass} to={props.path}><Content/></Link> :
      <div className={elementClass}><Content/></div>);
}

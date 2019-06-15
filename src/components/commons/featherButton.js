import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';
import getClassName from "./getClassName";

/**
 * Creates a button decorated with a Feather icon.
 *
 * @param {string} props.caption Button text; optional
 * @param {string} props.featherIcon Name of icon; see {@link https://feathericons.com/}
 * @param {string} props.to Path to navigate after pressing the button
 * @return {*} An element of 'button' class. The exact element depends on the existence of props.to.
 * @constructor
 */
const FeatherButton = (props) => {
  // checks existence of props.featherIcon and creates the icon if exists
  let icon =
      typeof props.featherIcon === 'string' ?
          <FeatherIcon iconName={props.featherIcon} /> : '';
  // checks existence of props.caption
  let caption =
      typeof props.caption === 'string' && props.caption.trim() !== '' ?
          <span>{ props.caption }</span> : '';

  if (icon === '' && caption === '') {
    // if there are no parameters, returns an empty <span>
    return <span/>;
  } else {
    const className = getClassName("button", props);

    if (props.to) {
      // if props.to is defined, create a <Link/>
      return (
          <Link className={className} to={props.to}>
            {icon}
            {caption}
          </Link>);
    }
    else {
      // if not, create a <span>
      return <span className={className}>{icon}{caption}</span>
    }
  }
};

export default FeatherButton;
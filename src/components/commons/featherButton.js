import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';
import getClassName from "../../utilities/getClassName";

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
  let { featherIcon, caption, to, otherProps } = props;

  // checks existence of props.featherIcon and creates the icon if exists
  const iconElement = typeof featherIcon === 'string' ?
      <FeatherIcon iconName={featherIcon} /> : '';
  // checks existence of props.caption
  const captionElement = typeof caption === 'string' && caption.trim() !== '' ?
        <span>{ caption.trim() }</span> : '';

  if (!iconElement && !captionElement) {
    // if there are no parameters, throws an error
    throw new Error("Empty element. Check props featherIcon and caption.");
  } else {
    const className = getClassName("button", props);

    if (to) {
      // if props.to is defined, create a <Link/>
      return (
          <Link className={className} to={to} {...otherProps}>
            {iconElement}
            {captionElement}
          </Link>);
    }
    else {
      // if not, create a <span>
      return <button className={className} {...otherProps} onClick={props.onClick}>{iconElement}{captionElement}</button>
    }
  }
};

export default FeatherButton;
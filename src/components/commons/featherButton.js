import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';
import getClassName from "./getClassName";

const FeatherButton = (props) => {
  // checks existence of props.featherIcon and creates tie icon if exists
  let icon =
      typeof props.featherIcon === 'string' ?
          <FeatherIcon iconName={props.featherIcon}/> : '';
  // checks existence of props.caption
  let caption =
      typeof props.caption === 'string' && props.caption.trim() !== '' ?
          <span>{ props.caption }</span> : '';

  if (icon === '' && caption === '') {
    // if there are no parameters, returns an empty <span>
    return <span/>;
  } else {
    // else, create a <Link/>
    return (
        <Link className={getClassName("button", props)}
              to={props.to}>
          {icon}
          {caption}
        </Link>);
  }
};

export default FeatherButton;
import React from 'react';
import feather from 'feather-icons';
import getClassName from './getClassName';

const EMPTY_SPAN = <span/>;

export default function FeatherIcon (props) {
  // Gets icon name from props
  const iconName = props.iconName;
  if (typeof iconName === 'string') {
    const icon = feather.icons[iconName.trim()];
    if (icon === undefined) {
      // If icon object is undefined, return empty span
      return EMPTY_SPAN;
    }
    else {
      // If icon object is not null, set SVG
      // feather.icons[].toSvg() returns a string that must be converted onto HTML/JSX
      return <span className={getClassName("icon", props)}
                   dangerouslySetInnerHTML={{ __html: icon.toSvg(props) }}/>;
    }
  }
  // If icon name is not a string, return empty span
  else return EMPTY_SPAN;
};
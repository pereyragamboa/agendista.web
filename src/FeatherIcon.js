import React from 'react';
import feather from 'feather-icons';

const FeatherIcon = (props) => {
  // Gets icon name from props
  const iconName = props.iconName;

  // If icon name is not null, set SVG
  // feather.icons[].toSvg() returns a string, not valid HTML/JSX
  return <span dangerouslySetInnerHTML={
    (typeof (iconName) === 'string' && iconName.trim() !== '')
        ? { __html: feather.icons[iconName.trim()].toSvg(props) }
        : ''
  }/>;
};


export default FeatherIcon;
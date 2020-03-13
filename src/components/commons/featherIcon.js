import React from 'react';
import feather from 'feather-icons';
import getClassName from '../../utilities/getClassName';

const ERR_UNDEFINED_ICON = new Error(
    "Icon name not defined. Check full list at https://feathericons.com/.");

/**
 * Creates a Feather icon. {https://feathericons.com/}.
 * @param props.iconName Name of the icon.
 * @return A <span> tag containing SVG for a Feather icon, or an empty one if the
 * icon name provided is not valid.
 */
export default function FeatherIcon (props) {
  // Gets icon name from props
  const iconName = props.iconName;
  if (typeof iconName === 'string') {
    const icon = feather.icons[iconName.trim()];
    if (icon === undefined) {
      // If icon object is undefined, throw error
      throw ERR_UNDEFINED_ICON;
    }
    else {
      // If icon object is not null, set SVG
      // feather.icons[].toSvg() returns a string that must be converted onto HTML/JSX
      return <span className={getClassName("icon", props)}
                   dangerouslySetInnerHTML={{ __html: icon.toSvg(props) }}/>;
    }
  }
  // If icon name is not a string, return empty span
  else throw ERR_UNDEFINED_ICON;
};
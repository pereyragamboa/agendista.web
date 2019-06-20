import React from 'react';
import FeatherIcon from './featherIcon';

/**
 * Creates a Bulma-styled input, decorated with Feather icons.
 *
 * @param props.caption Label of the input.
 * @param props.iconName Feather icon name.
 * @param props.placeholder Placeholder text in the input.
 * @return {*}
 * @constructor
 */
export default function FeatherInput(props){
  return <div className="field">
    <label className="label">{props.caption}</label>
    <div className="control has-icons-left">
      <FeatherIcon iconName={props.iconName}/>
      <input className="input" placeholder={props.placeholder}/>
    </div>
  </div>
}
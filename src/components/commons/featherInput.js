import React from 'react';
import FeatherIcon from './featherIcon';
import getClassName from './getClassName';

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
  return <div className={getClassName("field", props)}>
    <label className="label">{props.caption}</label>
    <div className="control has-icons-left">
      <FeatherIcon iconName={props.iconName}/>
      <input className="input" type={props.type} placeholder={props.placeholder}/>
    </div>
  </div>
}
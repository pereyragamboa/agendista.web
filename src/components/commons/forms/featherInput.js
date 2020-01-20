import React from 'react';
import getFormControl from './getFormControl';

/**
 * Creates a Bulma-styled input, decorated with Feather icons.
 *
 * @param props.id Identifier of the element.
 * @param props.type Label of the input.
 * @param props.placeholder Placeholder text in the input.
 * @param props.value Value displayed in the input.
 * @return {*}
 * @constructor
 */
export default function FeatherInput (props) {
  // We don't need to assign input-specific props to the control container
  const {id, type, placeholder, value, onChange, ...baseProps} = props;
  const FeatherInput = getFormControl(() =>
    <input id={id} className="input" type={type} placeholder={placeholder} defaultValue={value}
           onChange={onChange} />);

  return <FeatherInput {...baseProps}/>;
}
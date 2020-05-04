import React from 'react';
import getFormControl from './getFormControl';

/**
 * Creates a Bulma-styled text input element, decorated with Feather icons.
 *
 * @param props.helperComponent Component to be shown as a helper.
 * @param props.id Identifier of the input.
 * @param props.name Name of the input.
 * @param props.type Data type of the input.
 * @param props.onChange Event dispatched when the input value changes.
 * @param props.placeholder Placeholder text in the input.
 * @param props.value Value displayed in the input.
 * @return {*}
 * @constructor
 */
export default function FeatherInput (props) {
  // We don't need to assign input-specific props to the control container
  const { helperComponent, ...otherProps} = props;
  const FeatherInput = getFormControl(
      (props) => <input className="input" {...props} />,
      helperComponent);

  return <FeatherInput {...otherProps}/>;
}
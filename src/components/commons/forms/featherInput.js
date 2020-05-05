import React from 'react';
import FormControl from './formControl';

/**
 * Creates a Bulma-styled text input element, decorated with Feather icons.
 *
 * The properties are the same as those of <FormControl>.
 *
 * @return {*}
 * @constructor
 */
export default function FeatherInput (props) {
  // Select props specific of <FormControl>, pass the rest to <input>
  const { caption, children, helperElement, iconName, ...inputProps } = props;
  const formControlProps = { caption, children, helperElement, iconName };

  return <FormControl {...formControlProps} inputElement={<input className="input" {...inputProps} />}/>;
}
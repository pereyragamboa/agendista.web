import React from 'react';
import FeatherIcon from '../featherIcon';
import getClassName from '../../../utilities/getClassName';

/**
 * Wraps a form input element into a Bulma-styled field, decorated with Feather icons.
 *
 * @param inputElement <input> element to be embedded.
 * @return {*}
 * @constructor
 */
export default function getFormControl(InputElement) {
  return class extends React.Component {
    render() {
      const {caption, iconName, ...otherProps} = this.props;
      const controlClassName = ["control", (iconName ? "has-icons-left" : '')].join(' ');

      return <div className={getClassName("field", this.props)}>
        <label className="label">{caption}</label>
        <div className={controlClassName}>
          <FeatherIcon iconName={iconName}/>
          <InputElement {...otherProps}/>
        </div>
      </div>;
    }
  }
}
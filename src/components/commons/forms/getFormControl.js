import React from 'react';
import FeatherIcon from '../featherIcon';
import getClassName from '../getClassName';

/**
 * Wraps a form input element into a Bulma-styled field, decorated with Feather icons.
 *
 * @param inputElement <input> element to be embedded.
 * @return {*}
 * @constructor
 */
export default function getFormControl(inputElement) {
  return class extends React.Component {
    render() {
      const {caption, iconName} = this.props;

      return <div className={getClassName("field", this.props)}>
        <label className="label">{caption}</label>
        <div className="control has-icons-left">
          <FeatherIcon iconName={iconName}/>
          {inputElement}
        </div>
      </div>
    }
  }
}
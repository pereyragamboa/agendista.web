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
      return <div className={getClassName("field", this.props)}>
        <label className="label">{this.props.caption}</label>
        <div className="control has-icons-left">
          <FeatherIcon iconName={this.props.iconName}/>
          {
            // Insert the element as an object; if we want to use JSX we should
            // declare a function that returns this element and declare the function
            inputElement
          }
        </div>
      </div>
    }
  }
}
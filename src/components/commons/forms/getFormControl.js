import React from 'react';
import FeatherIcon from '../featherIcon';
import getClassName from '../../../utilities/getClassName';

/**
 * Wraps a form input element into a Bulma-styled field, decorated with Feather icons.
 * If the component has children, they will be shown as addons to the main input element.
 *
 * @param InputElement <input> element to be embedded.
 * @return {*}
 * @constructor
 */
export default function getFormControl(InputElement) {
  return class extends React.Component {
    render() {
      const {caption, iconName, ...otherProps} = this.props;
      const hasChildren = this.props.children;
      const fieldClassName = [
        "field",
        (hasChildren ? "has-addons" : '')
      ].join(' ');
      const controlClassName = [
          "control",
          (iconName ? "has-icons-left" : ''),
          (hasChildren ? "is-expanded" : '')
      ].join(' ');
      const captionElement = caption ? (
          hasChildren ?
              <div className="control"><button className="button is-static">{caption}</button></div> :
              <label className="label">{caption}</label>
          ) : "";
      const addOns = hasChildren ?
          <div className="control">{this.props.children}</div> :
          "";

      return <div className={getClassName(fieldClassName, this.props)}>
        {captionElement}
        <div className={controlClassName}>
          <FeatherIcon iconName={iconName}/>
          <InputElement {...otherProps}/>
        </div>
        {addOns}
      </div>;
    }
  }
}
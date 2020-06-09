import React from 'react';
import FeatherIcon from '../featherIcon';
import getClassName from '../../../utilities/getClassName';

export const ClassNames = {
  CAPTION: "form-control-caption",
  ADD_ON: "form-control-addon",
  HELP: "form-control-help"
};

/**
 * Wraps a form input element into a Bulma-styled field, decorated with Feather icons.
 * If the component has children, they will be shown as addons to the main input element.
 * The structure of the control is as follows:
 * - A field container, with:
 *   - A caption element, that might be a static <button> if the control has children, or
 *     a <label> element; both elements contain a string;
 *   - An <input> element, passed as InputElement;
 *   - A <svg> icon, implemented as a FeatherIcon component
 * - Zero or more children, displayed as addons.
 *
 * The component should be rendered like this:
 * - Outside the input element, the caption element:
 *   - For childless inputs, the caption is on top,
 *   - For inputs with children, the caption is on the left
 * - Inside the input element, on the left, the icon
 *
 *
 * Full documentation of Bulma inputs is in https://bulma.io/documentation/form/general/; see especially
 * the sections 'With icons' and 'Form addons'.
 *
 * @param props.caption Control caption.
 * @param props.children Children of the element, shown as addons.
 * @param props.helperElement Control help message. Optional
 * @param props.iconName Name of the icon shown within the input element.
 * @param props.inputElement Main <input> element.
 * @param props Properties of the element. The rest of the properties are passed to the input element.
 * @return {*}
 * @constructor
 */
export default function FormControl(props) {
  /**
   */
    const {caption, children, helperElement, iconName, inputElement, ...otherProps} = props;

    const fieldClassName = [
      "field",
      (children ? "has-addons" : '')
    ].join(' ');
    const controlClassName = [
      "control",
      (iconName ? "has-icons-left" : ''),
      (children ? "is-expanded" : '')
    ].join(' ');
    const captionElement = caption ? (
        children ?
            <div className="control"><button className={`button is-static ${ClassNames.CAPTION}`}>{caption}</button></div> :
            <label className={`label ${ClassNames.CAPTION}`}>{caption}</label>
    ) : "";

    return <div className={getClassName(fieldClassName, otherProps)}>
      {captionElement}
      <div className={controlClassName}>
        { iconName && <FeatherIcon className="is-left" iconName={iconName}/> }
        { inputElement }
      </div>
      { children ? <div className={`control ${ClassNames.ADD_ON}`}>
            { children }
          </div> : ""
      }
      { helperElement }
    </div>;
};
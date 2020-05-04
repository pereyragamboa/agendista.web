import React from 'react';
import FeatherIcon from '../featherIcon';
import getClassName from '../../../utilities/getClassName';

export const ClassNames = {
  CAPTION: "form-control-caption",
  ADD_ON: "form-control-addon",
  HELP: "form-control-help"
};

export const Ids = {
  getHelpId: (id) => `${id}-help-element`
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
 * @param InputElement <input> element to be embedded.
 * @param HelperElement Help message to be displayed. Optional.
 * @return {*}
 * @constructor
 */
export default function getFormControl(InputElement, HelperElement) {
  /**
   * @param props.caption Control caption.
   * @param props.iconName Name of the icon shown within the input element.
   * @param props.children Children of the element, shown as addons.
   * @param props Properties of the element. The rest of the properties are passed to the input element.
   */
  return function (props) {
    const {caption, iconName, children, ...otherProps} = props;

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
    const addOns = children ?
        <div className={`control ${ClassNames.ADD_ON}`}>
          { children }
        </div> : "";
    const helpId = otherProps.id ? Ids.getHelpId(otherProps.id) : "";

    return <div className={getClassName(fieldClassName, otherProps)}>
      {captionElement}
      <div className={controlClassName}>
        { iconName && <FeatherIcon className="is-left" iconName={iconName}/> }
        <InputElement {...otherProps}/>
      </div>
      {addOns}
      {
        HelperElement &&
         <div id={helpId} className={`help ${ClassNames.HELP}`}><HelperElement/></div>
      }
    </div>;
  }
};
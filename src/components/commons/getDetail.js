import React from 'react';
import FeatherIcon from './featherIcon';

const DETAIL_OK_BUTTON_ID = "ag-detail-ok-button";
const DETAIL_CANCEL_BUTTON_ID = "ag-detail-cancel-button";

export const ButtonIds = {
  OK_BUTTON: DETAIL_OK_BUTTON_ID,
  CANCEL_BUTTON: DETAIL_CANCEL_BUTTON_ID
};

export const ElementIds = {
  TITLE: "ag-detail-title",
  TITLE_ICON: "ag-detail-title-icon"
};

/**
 * Toggles enabling of OK button.
 * @param {boolean} enable
 */
function enableOkButton(enable = true) {
  const okButton = document.getElementById(DETAIL_OK_BUTTON_ID);
  if (enable)
    okButton.classList.remove("is-static");
  else
    okButton.classList.add("is-static");
}

/**
 *
 * Higher order component that creates a detail screen. A detail screen consists of
 * a form, an OK button and a Cancel button. The cancel button goes to the previous
 * page in the browser history.
 *
 * @param FormComponent Component with form controls (inputs, checkboxes, etc)
 * @param okClick callback of click on OK button
 * @return function A function component.
 */
export default function getDetail(FormComponent, okClick = () => {}){
  /**
   * @param props.cancelCaption Text of the Cancel button
   * @param props.featherIcon Name of Feather icon shown next to title
   * @param props.id: Identifier of the screen
   * @param props.okCaption Text of the OK button
   * @param props.title Detail title.
   * @return {Component} A detail component.
   */
  return function (props) {
    return <section id={props.id}>
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-item">
            { props.featherIcon && <FeatherIcon id={ElementIds.TITLE_ICON} iconName={props.featherIcon}/> }
            { props.featherIcon && <span>&nbsp;</span> }
            <h1 id={ElementIds.TITLE} className="title is-4">{props.title}</h1>
          </div>
        </div>
      </nav>
      <div className="box">
        <FormComponent {...props} />
      </div>
      <div className="buttons">
        <button id={DETAIL_OK_BUTTON_ID} className="button is-primary is-static" onClick={okClick}>
          <FeatherIcon iconName="check"/>
          <span>{ props.okCaption || "Agregar" }</span>
        </button>
        <button id={DETAIL_CANCEL_BUTTON_ID} className="button is-danger" onClick={() => window.history.back()}>
          <FeatherIcon iconName="x"/>
          <span>{ props.cancelCaption || "Cancelar" }</span>
        </button>
      </div>
    </section>;
  };
}

export { enableOkButton };
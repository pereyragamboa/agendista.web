import React from 'react';
import FeatherIcon from './featherIcon';

export const Ids = {
  OK_BUTTON: "ag-detail-ok-button",
  CANCEL_BUTTON: "ag-detail-cancel-button",
  TITLE: "ag-detail-title",
  TITLE_ICON: "ag-detail-title-icon"
};

/**
 *
 * Detail screen wrapper.
 *
 * A detail screen consists of form elements, an OK button and a Cancel button.
 * The cancel button goes to the previous page in the browser history.
 *
 * The component embeds its children in a <form> element.
 *
 * @param cancelCaption Text of the Cancel button
 * @param children Content of the detail form. It should not include a <form> element.
 * @param enableOkButton Enables OK button
 * @param featherIcon Name of Feather icon shown next to title
 * @param id: Identifier of the screen
 * @param okCaption Text of the OK button
 * @param onSubmit callback of click on OK button
 * @param title Detail title.
 * @return {Component} A detail component.
 */
export default function Detail (
    { cancelCaption, children, enableOkButton, featherIcon, id, okCaption, onSubmit, title }) {
  function submit(e) {
    e.preventDefault();
    onSubmit();
  }

  const okButtonClassName = `button is-primary${enableOkButton ? "" : " is-static"}`;

  return <section id={id}>
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-item">
          { featherIcon && <FeatherIcon id={Ids.TITLE_ICON} iconName={featherIcon}/> }
          { featherIcon && <span>&nbsp;</span> }
          <h1 id={Ids.TITLE} className="title is-4">{title}</h1>
        </div>
      </div>
    </nav>
    <form onSubmit={submit}>
      <div className="box">
        { children }
      </div>
      <div className="buttons">
        <button id={Ids.OK_BUTTON} type="submit" className={okButtonClassName}>
          <FeatherIcon iconName="check"/>
          <span>{ okCaption || "Agregar" }</span>
        </button>
        <button id={Ids.CANCEL_BUTTON} type="button" className="button is-danger"
                onClick={() => window.history.back()}>
          <FeatherIcon iconName="x"/>
          <span>{ cancelCaption || "Cancelar" }</span>
        </button>
      </div>
    </form>
  </section>;
};
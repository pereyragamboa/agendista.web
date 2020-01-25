import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';

/**
 *
 * Higher order component that creates a detail screen. A detail screen consists of
 * a form, an OK button and a Cancel button.
 *
 * @param FormComponent Component with form controls (inputs, checkboxes, etc)
 * @param okClick callback of click on OK button
 * @return function
 */
export default function getDetail(FormComponent, okClick = () => {}){
  /**
   * @param props.cancelCaption Text of the Cancel button
   * @param props.cancelPath Path of the page to navigate after pressing the Cancel button
   * @param props.featherIcon Name of Feather icon
   * @param props.id: Identifier of the screen
   * @param props.okCaption Text of the OK button
   * @param props.title Displayed title of the screen
   */
  return function (props) {
    return <section id={props.id}>
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-item">
            { props.featherIcon && <FeatherIcon iconName={props.featherIcon}/> }
            { props.featherIcon && <span>&nbsp;</span> }
            <h1 className="title is-4">{props.title}</h1>
          </div>
        </div>
      </nav>
      <div className="box">
        <FormComponent {...props} />
      </div>
      <div className="buttons">
        <button className="button is-primary" onClick={okClick}>
          <FeatherIcon iconName="check"/>
          <span>{ props.okCaption || "Agregar" }</span>
        </button>
        <Link className="button is-danger" to={props.cancelPath}>
          <FeatherIcon iconName="x"/>
          <span>{ props.cancelCaption || "Cancelar" }</span>
        </Link>
      </div>
    </section>;
  };
}
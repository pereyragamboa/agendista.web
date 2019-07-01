import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';

/**
 *
 * Higher order component that creates a detail screen.
 *
 * @param FormComponent contains a group of form controls (inputs, checkboxes, etc)
 * @param okClick callback of click on OK button
 * @return function(props)
 */
export default function getDetail(FormComponent, okClick = () => {}){
  /**
   @param props.addCaption Text of the Add button
   @param props.cancelCaption Text of the Cancel button
   @param props.cancelPath Path of the page to navigate after pressing the Cancel button
   @param props.featherIcon Name of Feather icon
   @param props.id: Identifier of the screen
   @param props.okCaption Text of the OK button
   @param props.title Displayed title of the screen
   */
  return function (props) {
    return <section id={props.id}>
      <h1 className="title is-4">{props.title}</h1>
      <div className="box">
        <FormComponent />
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
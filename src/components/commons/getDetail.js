import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';

// Higher order component that creates a detail screen.
//
// FormComponent: contains a group of form controls (inputs, checkboxes, etc)
// okClick: callback of click on OK button
//
// props:
// - addCaption: text of the Add button
// - cancelCaption: text of the Cancel button
// - cancelPath: path of the page to navigate after pressing the Cancel button
// - id: identifier of the screen
// - title: displayed title of the screen
export default function getDetail(FormComponent, okClick = () => {}){
  /**
   @param props.addCaption Text of the Add button
   @param props.cancelCaption Text of the Cancel button
   @param props.cancelPath Path of the page to navigate after pressing the Cancel button
   @param props.id: Identifier of the screen
   @param props.okCaption Text of the OK button
   @param props.title Displayed title of the screen
   */
  return class extends React.Component {
    render() {
      return <div id={this.props.id}>
        <h1 className="title">{this.props.title}</h1>
        <div className="box">
          <FormComponent />
        </div>
        <div className="buttons">
          <button className="button is-primary" onClick={okClick}>
            <FeatherIcon iconName="check"/>
            <span>{ this.props.okCaption || "Agregar" }</span>
          </button>
          <Link className="button is-danger" to={this.props.cancelPath}>
            <FeatherIcon iconName="x"/>
            <span>{ this.props.cancelCaption || "Cancelar" }</span>
          </Link>
        </div>
      </div>;
    }
  };
}
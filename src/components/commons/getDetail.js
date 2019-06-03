import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';

// Higher order component that creates a detail screen.
//
// FormComponent: contains a group of form controls (inputs, checkboxes, etc)
//
// props:
// - addCaption: text of the Add button
// - cancelCaption: text of the Cancel button
// - cancelPath: path of the page to navigate after pressing the Cancel button
// - id: identifier of the screen
// - title: displayed title of the screen
// - updateCaption: text of the Modify button
export default function getDetail(FormComponent){
  return class extends React.Component {
    render() {
      return <div id={this.props.id}>
        <h1 className="title">{this.props.title}</h1>
        <div className="box">
          <FormComponent />
        </div>
        <div className="buttons">
          <button className="button is-primary">
            <FeatherIcon iconName="plus"/>
            <span>{ this.props.addCaption || "Agregar" }</span>
          </button>
          <button className="button is-primary">
            <FeatherIcon iconName="edit-2"/>
            <span>{ this.props.updateCaption || "Modificar" }</span>
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
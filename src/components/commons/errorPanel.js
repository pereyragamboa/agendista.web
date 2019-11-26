import React from 'react';
import FeatherIcon from "./featherIcon";

/**
 * Displays an error message.
 * @param props.errorMessage Error message to be displayed.
 * @return {*} A <div> with an error message.
 */
export default (props) => <div className="columns">
    <div className="column box is-half is-offset-one-quarter">
      <p className="has-text-danger has-text-centered">
        <FeatherIcon className="is-large" width="72" height="72" iconName="x-circle"/>
      </p>
      <h1 className="title has-text-centered">Algo salió mal.</h1>
        <div className="container">
          <p><strong>Mensaje:</strong> {props.errorMessage}</p>
        </div>
    </div>
  </div>;

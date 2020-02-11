import React from 'react';
import FeatherIcon from "./featherIcon";

/**
 * Displays an error message.
 * @return {*} A <div> with an error message.
 */
export default (props) => <div>
    <p className="has-text-danger has-text-centered">
      <FeatherIcon className="is-large" width="48" height="48" iconName="x-circle"/>
    </p>
    <h1 className="title has-text-centered">Algo salió mal.</h1>
    { props.children && <div className="content">
      <h3 className="title is-5">Reporte:</h3>
      {props.children}
    </div> }
  </div>;

import React from 'react';

/**
 * Shows a loading panel.
 *
 * @param props.subject The thing in course of loading.
 * @return {*}
 * @constructor
 */
export default function LoadingPanel(props) {
  return <div>
    <h3 className={"title is-4 has-text-centered"}>Buscando{props.subject ? ' ' + props.subject.toLowerCase() : ''}...</h3>
    <progress className={"progress is-primary"} max={100}/>
  </div>
}
import React from 'react';

export const LOADING_PANEL_ID = "ag-loading-panel";

/**
 * Shows a loading panel.
 *
 * @param props.subject The thing in course of loading.
 * @return {*}
 * @constructor
 */
export default function LoadingPanel(props) {
  return <div id={LOADING_PANEL_ID}>
    <h3 className={"title is-4 has-text-centered"}>Buscando{props.subject ? ' ' + props.subject.toLowerCase() : ''}...</h3>
    <progress className={"progress is-primary"} max={100}/>
  </div>
}
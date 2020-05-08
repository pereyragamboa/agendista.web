import React from 'react';
import {SimpleProgressPanel} from './progressPanel';

export const LOADING_PANEL_ID = "ag-loading-panel";

/**
 * Shows a loading panel.
 *
 * @param props.subject The thing in course of loading.
 * @return {*}
 * @constructor
 */
export default function LoadingPanel(props) {
  const caption = `Buscando${props.subject ? ' ' + props.subject.toLowerCase() : ''}...`;

  return <SimpleProgressPanel id={LOADING_PANEL_ID} caption={caption}/>;
}
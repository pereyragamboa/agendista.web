import React from 'react';
import {SimpleProgressPanel} from './progressPanel';

export const SAVING_PANEL_ID = "ag-loading-panel";

/**
 * Shows a saving panel.
 *
 * @param props.subject The thing in course of saving.
 * @return {*}
 * @constructor
 */
export default function SavingPanel(props) {
  const caption = `Guardando${props.subject ? ' ' + props.subject.toLowerCase() : ''}...`;

  return <SimpleProgressPanel id={LOADING_PANEL_ID} caption={caption}/>;
}
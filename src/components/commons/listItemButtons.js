import React from 'react';
import FeatherButton from './featherButton';
import { showModal } from './modals/modalFunctions';

export const ClassNames = {
  EDIT_LIST_ITEM_BUTTON: "ag-list-item-edit-button",
  DELETE_LIST_ITEM_BUTTON: "ag-list-item-delete-button"
};

/**
 * Action buttons for list items.
 *
 * The component assumes that:
 * - For editing an item, the application will open a detail page
 * - For deleting an item, the application will show a confirmation modal
 *
 * @param {object} props List of properties:
 * @param {string} props.editPath Path of edition page
 * @param {string} props.deleteModalId ID of delete confirmation modal
 * @constructor
 * @return {Component} A component with a <div> root element.
 */
export default function ListItemButtons(props) {
  return <div className="level-right">
    <div className="buttons level-item">
      <FeatherButton className={`is-primary ${ClassNames.EDIT_LIST_ITEM_BUTTON}`}
                     featherIcon="edit-2" to={props.editPath}/>
      <FeatherButton className={`is-danger ${ClassNames.DELETE_LIST_ITEM_BUTTON}`}
                     featherIcon="trash-2" onClick={() => showModal(props.deleteModalId)}/>
    </div>
  </div>;
}

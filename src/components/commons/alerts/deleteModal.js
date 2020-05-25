import React from 'react';

export const Ids = {
  YES_BUTTON: "ag-delete-modal-yes-button",
  NO_BUTTON: "ag-delete-modal-no-button"
};

export const Captions = {
  DEFAULT_CAPTION: '¿Desea eliminar este elemento?'
};

/** Creates a modal for deleting an element.
 *
 * @param props.children Content of the modal; if not specified shows a default message
 * @param props.id Identifier of the modal; required by showModal component
 * @param props.delete {Function} Function performing the deletion of the referenced object
 * @constructor
 */
export default function DeleteModal(props) {
  if (!props.id) throw new Error("Missing ID from <DeleteModal>.");

  /**
   * Discards and hides the modal.
   */
  function discard() {
    document.getElementById(props.id).classList.remove("is-active");
  }

  /**
   * Executes the delete action for which the modal was requesting confirmation.
   *
   * This function wraps the call to props.delete, adding a previous type check.
   * This also corrects a warning raised when props.delete is directly referenced in
   * onClick.
   */
  function confirm() {
    if (typeof props.delete === 'function') {
      props.delete();
    }
  }

  const content = props.children || Captions.DEFAULT_CAPTION;
  const modalClass = `modal${props.show ? " is-active" : ""}`;

  return <div id={props.id} className={modalClass}>
    <div className="modal-background"/>
    <div className="modal-content box">
      <div className="content">{content}</div>
      <div className="buttons">
        <button id={Ids.YES_BUTTON} className="button is-danger" onClick={confirm}>Sí</button>
        <button id={Ids.NO_BUTTON} className="button is-primary" onClick={discard}>No</button>
      </div>
    </div>
  </div>;
}
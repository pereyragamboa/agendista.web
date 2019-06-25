import React from 'react';

/** Creates a modal for deleting an element.
 @param props.children Content of the modal; if not specified shows a default message
 @param props.id Identifier of the modal; required by showModal component
 @param props.delete Function performing the deletion of the referenced object
 @constructor
 */
export default function DeleteModal(props) {
  function discard() {
    document.getElementById(props.id).classList.remove("is-active");
  }

  // This function wraps the call to props.delete, adding a previous type check.
  // This also corrects a warning raised when props.delete is directly referenced in
  // onClick.
  function confirm() {
    if (typeof props.delete === 'function') {
      props.delete();
    }
  }

  const content = props.children || '¿Desea eliminar este elemento?';

  return <div id={props.id} className="modal">
    <div className="modal-background"/>
    <div className="modal-content box">
      <div className="content">{content}</div>
      <div className="buttons">
        <button className="button is-danger" onClick={confirm}>Sí</button>
        <button className="button is-primary" onClick={discard}>No</button>
      </div>
    </div>
  </div>;
}
import React from 'react';

// Creates a modal for deleting an element.
// props:
// - id: id of the modal; required by showModal component
// deleteClick: function to be executed when user confirms deletion
// (presumably it will "delete" an item from a data source)
export default function DeleteModal(props, deleteClick) {
  function discard() {
    document.getElementById(props.id).classList.remove("is-active");
  }

  // This function wraps the call to deleteClick, adding a previous type check.
  // This also corrects a warning when deleteClick is directly referenced in
  // onClick.
  function confirm() {
    if (typeof deleteClick === 'function') {
      deleteClick();
    }
  }

  return <div id={props.id} className="modal">
    <div className="modal-background"/>
    <div className="modal-content box">
      <p className="content">¿Desea eliminar este elemento?</p>
      <div className="buttons">
        <button className="button is-danger" onClick={confirm}>Sí</button>
        <button className="button is-primary" onClick={discard}>No</button>
      </div>
    </div>
  </div>;
}
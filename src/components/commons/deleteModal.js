import React from 'react';

export default function DeleteModal(props, deleteClick) {
  function discard() {
    document.getElementById(props.id).classList.remove("is-active");
  }

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
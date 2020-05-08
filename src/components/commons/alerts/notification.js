import React from 'react';

/**
 * Creates a notification.
 * @param id Identifier of the main element.
 * @param children Content of the notification.
 * @param onClick Funcion for hiding the notification.
 * @param show Shows or hide the notification.
 * @return {*}
 * @constructor
 */
export default function Notification({id, children, onClick, show}) {
  return (show === undefined || show) ? <div id={id} className="notification is-success">
      { children }
      <button className="delete" type="button" aria-label="delete" onClick={onClick}/>
    </div> : null;
}

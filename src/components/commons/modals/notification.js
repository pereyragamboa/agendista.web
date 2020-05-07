import React, { useState } from 'react';

export default function Notification({id, children, show}) {
  if (show === undefined) show = true;
  const [ notification, showNotification ] = useState(show);

  return notification && <div id={id} className="notification is-success">
    { children }
    <button className="delete" type="button" aria-label="delete" onClick={() => showNotification(false)}/>
  </div>;
}

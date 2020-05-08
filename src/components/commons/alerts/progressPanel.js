import React from 'react';

/**
 * Shows a customizable progress panel.
 *
 * @param children Content of the panel.
 * @param id Identifier of the panel's root element.
 * @return {*}
 * @constructor
 */
export default function ProgressPanel({children, id}) {
  return <div id={id}>
    {children}
    <progress className={"progress is-primary"} max={100}/>
  </div>
}

/**
 * Shows a simple progress panel.
 * @param id Identifier of the panel's root element.
 * @param caption Text to appear on the panel.
 * @return {*}
 * @constructor
 */
export function SimpleProgressPanel({id, caption}) {
  return <ProgressPanel id={id}>
    <h3 className={"title is-4 has-text-centered"}>
      {caption}
    </h3>
  </ProgressPanel>
}
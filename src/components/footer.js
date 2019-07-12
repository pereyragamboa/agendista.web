import React from 'react';

/**
 * Application footer. It contains a (very basic) about message.
 *
 * @return {*}
 * @constructor
 */
export default function Footer() {
  return <div id="ag-footer" className="hero-foot">
    <div className="container has-text-centered">
      <br/>
      <p>
        Hecho con&nbsp;
        <span role="img" aria-label="Corazón">&#x2764;&#xFE0F;</span> y&nbsp;
        <span role="img" aria-label="Café">&#x2615;</span> por&nbsp;
        <a href="https://github.com/pereyragamboa">Martín Pereyra</a>
      </p>
      <br/>
    </div>
  </div>
};
import React from 'react';

/**
 * Simple danger helper element.
 *
 * @param props.children Content of the helper.
 * @param props.id Identifier of the helper.
 * @return {*}
 * @constructor
 */
export const DangerHelper = (props) =>
    <p id={props.id} className="has-text-danger">{props.children}</p>;
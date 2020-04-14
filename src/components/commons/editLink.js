import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';

/**
 * Creates a decorated link for editing. The link has a small pencil icon to its right.
 * @param props.to Destination URL; ideally a form.
 * @param props.id Identifier of the element.
 * @return {*}
 */
export default (props) => <Link to={props.to}>
  <FeatherIcon iconName="edit-2" width="12" height="12"/>
  <span className={props.className} id={props.id}>{props.children}</span>
</Link>;


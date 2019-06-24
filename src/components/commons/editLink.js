import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from './featherIcon';

/**
 * Creates a decorated link for editing.
 * @param props.to Destination URL; ideally a form.
 * @return {*}
 */
export default (props) => <Link to={props.to}>
  <FeatherIcon iconName="edit-2" width="12" height="12"/>
  <span>{props.children}</span>
</Link>;


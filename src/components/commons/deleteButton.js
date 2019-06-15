import React from 'react';
import FeatherButton from './featherButton';
import getClassName from './getClassName';
import showModal from './showModal';

/**
 * Delete button.
 *
 * @param {string} props.modalId Identifier of the modal delete dialog
 * @return {*}
 * @constructor
 */
export default function DeleteButton(props) {
  return <FeatherButton className={getClassName("is-danger", props)} featherIcon="trash-2"
                        onClick={() => showModal(props.modalId)}/>
};
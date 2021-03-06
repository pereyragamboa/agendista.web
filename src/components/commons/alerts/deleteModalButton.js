import React from 'react';
import FeatherButton from '../featherButton';
import getClassName from '../../../utilities/getClassName';
import { showModal } from './modalFunctions';

/**
 * Button showing a delete confirmation modal.
 *
 * @param {string} props.modalId Identifier of the modal delete dialog. The ID should be
 * assigned to a DeleteModal.
 * @return {*}
 * @constructor
 */
export default function DeleteButton(props) {
  return <FeatherButton className={getClassName("is-danger", props)} featherIcon="trash-2"
                        onClick={() => showModal(props.modalId)}/>
};
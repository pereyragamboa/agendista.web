import React from 'react';
import * as Paths from '../../constants/paths';
import { DELETE_APPOINTMENT_MODAL as MODAL_ID } from "../../constants/modalIds";
import DeleteModal from '../commons/modals/deleteModal';
import EditLink from '../commons/editLink';
import ListItemButtons from '../commons/listItemButtons';

/**
 * Row element of an appointment list.
 *
 * @param props.clientName Name of the client making the appointment.
 * @param props.showButtons Shows or hides the list item buttons.
 * @param props.time Scheduled time of the appointment.
 * @return {*}
 * @constructor
 */
const AppointmentListElement = (props) =>
  <tr>
    <th><EditLink to={Paths.UPDATE_APPOINTMENT}>{props.time}</EditLink></th>
    <td>{props.clientName}</td>
    {
      props.showButtons ? (
          <td>
            <ListItemButtons editPath={Paths.UPDATE_APPOINTMENT} deleteModalId={MODAL_ID}/>
          </td>) : null
    }
  </tr>;

/**
 * List of appointments.
 *
 * @param props.showButtons Shows or hides the list item buttons.
 * @return {*}
 * @constructor
 */
export default function AppointmentList (props) {
  const { showButtons } = props;
  return (
      <React.Fragment>
        <table className="table is-fullwidth is-hoverable">
          <thead>
          <tr>
            <th>Hora</th><th>Cliente</th>
            {showButtons ? <th/> : null}
          </tr>
          </thead>
          <tbody>
            <AppointmentListElement clientName="Rosa Guadalupe Godínez" time="10:00" showButtons={showButtons} />
            <AppointmentListElement clientName="Sansón Carrasco" time="11:00" showButtons={showButtons} />
          </tbody>
        </table>
        <DeleteModal id={MODAL_ID}>
          ¿Desea eliminar esta cita?
        </DeleteModal>
      </React.Fragment>
  )
};
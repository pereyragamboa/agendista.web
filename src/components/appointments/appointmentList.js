import React from 'react';
import * as Paths from '../../constants/paths';
import { DELETE_APPOINTMENT_MODAL as MODAL_ID } from "../../constants/modalIds";
import DeleteModal from '../commons/deleteModal';
import EditLink from '../commons/editLink';
import ListItemButtons from '../commons/listItemButtons';

// Row of an appointment list.
const AppointmentListElement = (props) =>
  <tr>
    <th><EditLink to={Paths.UPDATE_APPOINTMENT}>{props.time}</EditLink></th>
    <td>{props.name}</td>
    {
      props.showButtons ? (
          <td>
            <ListItemButtons editPath={Paths.UPDATE_APPOINTMENT} deleteModalId={MODAL_ID}/>
          </td>) : null
    }
  </tr>
;

export default function AppointmentList (props) {
  const { showButtons } = props;
  return (
      <React.Fragment>
        <table className="table is-fullwidth is-hoverable">
          <thead>
          <tr>
            <th>Hora</th><th>Cliente</th>
            {props.showButtons ? <th/> : null}
          </tr>
          </thead>
          <tbody>
            <AppointmentListElement name="Rosa Guadalupe" time="10:00" showButtons={showButtons} />
            <AppointmentListElement name="Juan Salvador" time="11:00" showButtons={showButtons} />
          </tbody>
        </table>
        <DeleteModal id={MODAL_ID}>
          ¿Desea eliminar esta cita?
        </DeleteModal>
      </React.Fragment>
  )
};
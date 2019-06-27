import React from 'react';
import * as Paths from '../../paths';
import DeleteModal from '../commons/deleteModal';
import EditLink from '../commons/editLink';
import ListItemButtons from '../commons/listItemButtons';

const MODAL_ID = "ag-deleteAppointmentModal";

// Row of an appointment list.
const AppointmentListElement = (props) =>
  <tr>
    <th><EditLink to={Paths.ADD_APPOINTMENT}>{props.time}</EditLink></th>
    <td>{props.name}</td>
    {
      props.showButtons ? (
          <td>
            <ListItemButtons editPath={Paths.UPDATE_APPOINTMENT} deleteModalId={MODAL_ID}/>
          </td>) : ''
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
            {props.showButtons ? <th/> : ''}
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
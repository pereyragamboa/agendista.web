import React from 'react';
import { Link } from 'react-router-dom';
import * as Paths from '../../paths';
import DeleteModal from '../commons/deleteModal';
import ListItemButtons from '../commons/listItemButtons';

const MODAL_ID = "ag-deleteAppointmentModal";

// Row of an appointment list.
const AppointmentListElement = (props) =>
  <tr>
    <th><Link to={Paths.ADD_APPOINTMENT}>{props.time}</Link></th>
    <td>{props.name}</td>
    {
      props.showButtons ? (
          <td>
            <ListItemButtons editPath={Paths.ADD_APPOINTMENT} deleteModalId={MODAL_ID}/>
          </td>) : ''
    }
  </tr>
;

export default function AppointmentList (props) {
  return (
      <div>
        <table className="table is-fullwidth is-hoverable">
          <tbody>
            <AppointmentListElement name="Rosa Guadalupe" time="10:00" showButtons={props.showButtons} />
            <AppointmentListElement name="Juan Salvador" time="11:00" showButtons={props.showButtons} />
          </tbody>
        </table>
        <DeleteModal id={MODAL_ID}/>
      </div>
  )
};
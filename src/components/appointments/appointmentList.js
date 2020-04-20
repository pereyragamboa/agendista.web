import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as Paths from '../../constants/paths';
import { APPOINTMENTS } from "../../constants/headers";
import { DELETE_APPOINTMENT_MODAL as MODAL_ID } from "../../constants/modalIds";
import DeleteModal from '../commons/modals/deleteModal';
import EditLink from '../commons/editLink';
import ErrorPanel from '../commons/errorPanel';
import ListItemButtons from '../commons/listItemButtons';
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import { GET_PROFILE_APPOINTMENTS } from "../../data/queries/appointmentQueries";

export const ClassNames = {
  APPOINTMENT_LIST: "ag-appointment-list",
  APPOINTMENT_LIST_ITEM: "ag-appointment-list-item",
  APPOINTMENT_LIST_ITEM_DATE_TIME: "ag-appointment-list-item-date-time",
  APPOINTMENT_LIST_ITEM_CUSTOMER: "ag-appointment-list-item-customer"
};

export const Ids = {
  getListItemId: (id) => `ag-appointment-list-item-${id}`
};

/**
 * Row element of an appointment list.
 *
 * @param props.clientName Name of the client making the appointment.
 * @param props.id Identifier of the client, for backend purposes.
 * @param props.showButtons Shows or hides the list item buttons.
 * @param props.time Scheduled time of the appointment.
 * @return {*}
 * @constructor
 */
const AppointmentListElement = (props) => {
  const editPath = Paths.UPDATE_APPOINTMENT + props.id;
  return <tr id={Ids.getListItemId(props.id)} className={ClassNames.APPOINTMENT_LIST_ITEM}>
    <th><EditLink className={ClassNames.APPOINTMENT_LIST_ITEM_DATE_TIME} to={editPath}>{props.time}</EditLink></th>
    <td className={ClassNames.APPOINTMENT_LIST_ITEM_CUSTOMER}>{props.clientName}</td>
    {
      props.showButtons ? (
          <td>
            <ListItemButtons editPath={editPath} deleteModalId={MODAL_ID}/>
          </td>) : null
    }
  </tr>;
};

/**
 * List of appointments.
 *
 * @param props.showButtons Shows or hides the list item buttons.
 * @return {*}
 * @constructor
 */
export default function AppointmentList (props) {
  const { showButtons } = props;
  const { loading, error, data } = useQuery(GET_PROFILE_APPOINTMENTS);
  if (loading) return <LoadingPanel subject={ APPOINTMENTS }/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  return (
      <React.Fragment>
        <table className={`table is-fullwidth is-hoverable ${ClassNames.APPOINTMENT_LIST}`}>
          <thead>
          <tr>
            <th>Hora</th><th>Cliente</th>
            {showButtons ? <th/> : null}
          </tr>
          </thead>
          <tbody>
          {
            data.getProfileAppointments.sort((a, b) => a.date < b.date).map(appointment => {
              const appointmentTime = new Date(appointment.date);
              return <AppointmentListElement
                key={appointment.id} id={appointment.id}
                clientName={appointment.customer.firstName + ' ' + appointment.customer.lastName}
                time={appointmentTime.toLocaleString()} showButtons={showButtons}
            />;})
          }
          </tbody>
        </table>
        <DeleteModal id={MODAL_ID}>
          ¿Desea eliminar esta cita?
        </DeleteModal>
      </React.Fragment>
  )
};
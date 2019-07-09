import React from 'react';
import { DELETE_LEAVE_MODAL } from "../../constants/modalIds";
import { LEAVE } from "../../constants/headers";
import DeleteModal from '../commons/deleteModal';
import getIndex from '../commons/getIndex';
import ListItemButtons from '../commons/listItemButtons';
import NavbarMenuItem from '../commons/navbarMenuItem'

function LeaveRow (props) {
  let { fromDate, toDate } = props;

  if (fromDate > toDate) {
    const temp = fromDate;
    fromDate = toDate;
    toDate = temp;
  }

  return <tr>
    <td>{fromDate.toDateString()}</td>
    <td>{toDate.toDateString()}</td>
    <td><ListItemButtons deleteModalId={DELETE_LEAVE_MODAL}/></td>
  </tr>;
}

export default function LeaveList(props) {
  const listBody = <React.Fragment>
    <table className="table is-fullwidth">
      <tbody className="table-container">
        <tr>
          <th>Desde</th>
          <th>Hasta</th>
          <th/>
        </tr>
        <LeaveRow fromDate={new Date(2019, 11, 1)} toDate={new Date(2019, 11, 10)}/>
        <LeaveRow fromDate={new Date(2020, 4, 20)} toDate={new Date(2019, 5, 5)}/>
      </tbody>
    </table>
    <DeleteModal id={DELETE_LEAVE_MODAL}>¿Desea eliminar este periodo de vacaciones?</DeleteModal>
  </React.Fragment>;

  const navbarItems = {
    endItems: <NavbarMenuItem caption="Nuevo periodo de vacaciones" featherIcon="plus"/>
  }

  const LeaveIndex = getIndex(listBody, navbarItems);

  return <LeaveIndex {...props} brand={LEAVE} featherIcon="sun"/>;
}
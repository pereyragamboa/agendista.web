import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { DELETE_LEAVE_MODAL } from "../../constants/modalIds";
import { LEAVE } from "../../constants/headers";
import { ADD_LEAVE, UPDATE_LEAVE } from "../../constants/paths";
import DeleteModal from '../commons/alerts/deleteModal';
import ErrorPanel from '../commons/errorPanel';
import getIndex from '../commons/getIndex';
import listGraphQLErrors from '../commons/listGraphQLErrors';
import ListItemButtons from '../commons/listItemButtons';
import LoadingPanel from '../commons/alerts/loadingPanel';
import NavbarMenuItem from '../commons/navbars/navbarMenuItem'
import { GET_ALL_LEAVES } from "../../data/queries/leaveQueries";

export const ClassNames = {
  LEAVE_LIST_ITEM: "ag-leave-list-item",
  LEAVE_LIST_ITEM_FROM: "ag-leave-list-item-from",
  LEAVE_LIST_ITEM_TO: "ag-leave-list-item-to",
  LEAVE_LIST_ITEM_MOBILE: "ag-leave-list-item-mobile"
};

export const Ids = {
  LEAVE_LIST: "ag-leave-list",
  getListItemId: id => `ag-leave-list-item-${id}`
};

function LeaveRow (props) {
  let { fromDate, toDate } = props;

  if (fromDate > toDate) {
    const temp = fromDate;
    fromDate = toDate;
    toDate = temp;
  }

  const mobileDateOptions = {
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC'
  };

  const desktopDateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  };

  return <tr id={Ids.getListItemId(props.id)} className={ClassNames.LEAVE_LIST_ITEM}>
    <td className={`is-hidden-desktop ${ClassNames.LEAVE_LIST_ITEM_MOBILE}`}>{`
      ${fromDate.toLocaleDateString('default', mobileDateOptions)} -
      ${toDate.toLocaleDateString('default', mobileDateOptions)}`}
    </td>
    <td className={`is-hidden-touch ${ClassNames.LEAVE_LIST_ITEM_FROM}`}>
      {fromDate.toLocaleDateString('default', desktopDateOptions)}
    </td>
    <td className={`is-hidden-touch ${ClassNames.LEAVE_LIST_ITEM_TO}`}>
      {toDate.toLocaleDateString('default', desktopDateOptions)}
    </td>
    <td><ListItemButtons deleteModalId={DELETE_LEAVE_MODAL} editPath={ UPDATE_LEAVE + props.id }/></td>
  </tr>;
}

export default function LeaveList (props) {
  const { loading, error, data } = useQuery(GET_ALL_LEAVES);
  if (loading) return <LoadingPanel subject={LEAVE}/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  const listBody = <React.Fragment>
    <p>Los clientes no podrán agendar citas durante estos periodos.</p>
    <table id={Ids.LEAVE_LIST} className="table is-fullwidth">
      <tbody className="table-container">
        <tr>
          <th className="is-hidden-desktop">Periodo</th>
          <th className="is-hidden-touch">Desde</th>
          <th className="is-hidden-touch">Hasta</th>
          <th/>
        </tr>
        {
          data.getLeaves.map(leave =>
              <LeaveRow id={leave.id} key={`key${leave.id}`} fromDate={new Date(leave.from)} toDate={new Date(leave.to)}/>)
        }
      </tbody>
    </table>
    <DeleteModal id={DELETE_LEAVE_MODAL}>¿Desea eliminar este periodo vacacional?</DeleteModal>
  </React.Fragment>;

  const navbarItems = {
    endItems: <NavbarMenuItem caption="Nuevo periodo vacacional" featherIcon="plus" path={ADD_LEAVE}/>
  };

  const LeaveIndex = getIndex(listBody, navbarItems);

  return <LeaveIndex {...props} brand={LEAVE} featherIcon="sun"/>;
}
import React from 'react';
import { DELETE_LEAVE_MODAL } from "../../constants/modalIds";
import { LEAVE } from "../../constants/headers";
import { ADD_LEAVE, UPDATE_LEAVE } from "../../constants/paths";
import DeleteModal from '../commons/modals/deleteModal';
import getIndex from '../commons/getIndex';
import ListItemButtons from '../commons/listItemButtons';
import NavbarMenuItem from '../commons/navbars/navbarMenuItem'

function LeaveRow (props) {
  let { fromDate, toDate } = props;

  if (fromDate > toDate) {
    const temp = fromDate;
    fromDate = toDate;
    toDate = temp;
  }

  const mobileDateOptions = {
    month: 'numeric',
    day: 'numeric'
  };

  const desktopDateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return <tr>
    <td className="is-hidden-desktop">{`
      ${fromDate.toLocaleDateString('default', mobileDateOptions)} -
      ${toDate.toLocaleDateString('default', mobileDateOptions)}`}</td>
    <td className="is-hidden-touch">{fromDate.toLocaleDateString('default', desktopDateOptions)}</td>
    <td className="is-hidden-touch">{toDate.toLocaleDateString('default', desktopDateOptions)}</td>
    <td><ListItemButtons deleteModalId={DELETE_LEAVE_MODAL} editPath={ UPDATE_LEAVE }/></td>
  </tr>;
}

export default class LeaveList extends React.Component {
  render () {
    const listBody = <React.Fragment>
      <p>Los clientes no podrán agendar citas durante estos periodos.</p>
      <table className="table is-fullwidth">
        <tbody className="table-container">
          <tr>
            <th className="is-hidden-desktop">Periodo</th>
            <th className="is-hidden-touch">Desde</th>
            <th className="is-hidden-touch">Hasta</th>
            <th/>
          </tr>
          <LeaveRow fromDate={new Date(2019, 11, 1)} toDate={new Date(2019, 11, 10)}/>
          <LeaveRow fromDate={new Date(2020, 4, 20)} toDate={new Date(2020, 5, 5)}/>
        </tbody>
      </table>
      <DeleteModal id={DELETE_LEAVE_MODAL}>¿Desea eliminar este periodo vacacional?</DeleteModal>
    </React.Fragment>;

    const navbarItems = {
      endItems: <NavbarMenuItem caption="Nuevo periodo vacacional" featherIcon="plus" path={ADD_LEAVE}/>
    };

    const LeaveIndex = getIndex(listBody, navbarItems);

    return <LeaveIndex {...this.props} brand={LEAVE} featherIcon="sun"/>;
  }
}
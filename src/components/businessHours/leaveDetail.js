import React from 'react';
import { attachCalendars, RangedCalendarInput } from "../commons/forms/calendarInput";
import * as Paths from "../../constants/paths";
import getDetail from '../commons/getDetail';

export default class LeaveDetail extends React.Component{
  render() {
    const detailBody = () => <form className="field">
      <p>Seleccione el rango del periodo vacacional:</p>
      <RangedCalendarInput/>
    </form>;

    const LeaveDetail = getDetail(detailBody);

    return <LeaveDetail {...this.props} cancelPath={Paths.LIST_LEAVES}/>;
  }

  componentDidMount(){
    attachCalendars();
  }
}
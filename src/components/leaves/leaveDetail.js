import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router';
import { attachCalendars, RangedCalendarInput } from "../commons/forms/calendarInput";
import * as Paths from "../../constants/paths";
import ErrorPanel from '../commons/errorPanel';
import { GET_LEAVE } from '../../data/queries/leaveQueries';
import getDetail from '../commons/getDetail';
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import { LIST_LEAVES } from "../../constants/paths";

export class LeaveDetail extends React.Component{
  render() {
    const detailBody = (props) => <form className="field">
      <p>Seleccione el rango del periodo vacacional:</p>
      <RangedCalendarInput {...props}/>
    </form>;

    const LeaveDetail = getDetail(detailBody);

    return <LeaveDetail {...this.props} cancelPath={Paths.LIST_LEAVES}/>;
  }

  componentDidMount(){
    attachCalendars();
  }
}

export function AddLeaveDetail(props) {
  const fromDate = new Date();
  const toDate = new Date().setDate(fromDate.getDate() + 1);
  return <LeaveDetail from={fromDate} to={toDate} {...props}/>
}

export function EditLeaveDetail(props) {
  const { loading, error, data } = useQuery(GET_LEAVE, {
    variables: { id: props.match.params.id }
  });
  if (loading) return <LoadingPanel subject={"Vacaciones"}/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  if (data === undefined) return <Redirect to={LIST_LEAVES}/>;
  return <LeaveDetail from={data.getLeave.from} to={data.getLeave.to} {...props}/>;
}
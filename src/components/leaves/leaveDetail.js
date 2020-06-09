import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router';
import { RangedCalendarInput } from "../commons/forms/calendarInput";
import Detail from '../commons/detail';
import ErrorPanel from '../commons/errorPanel';
import { ADD_LEAVE, GET_LEAVE } from '../../data/queries/leaveQueries';
import { updateAfterAdd } from "../../data/resolvers/leaveResolvers";
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/alerts/loadingPanel';
import { LIST_LEAVES } from "../../constants/paths";
import Notification from "../commons/alerts/notification";

export const Ids = {
  ADD_LEAVE_CALENDAR: "ag-add-leave-calendar-input",
  EDIT_LEAVE_CALENDAR: "ag-edit-leave-calendar-input",
  CONFIRMATION_MESSAGE: "ag-leave-confirmation-message"
};

class LeaveDetail extends React.Component{
  render() {
    const { from, id, mutationStatus, notification, onSelect, title, to, ...props } = this.props;
    const hasData = mutationStatus !== undefined && mutationStatus.data !== undefined;
    return <Detail title={title} {...props} cancelPath={LIST_LEAVES}>
      <Notification id={Ids.CONFIRMATION_MESSAGE} show={hasData}>
        { notification }
      </Notification>
      <p>Seleccione el rango del periodo vacacional:</p>
      <RangedCalendarInput from={from} id={id} to={to}
                           onRangeSelect={(start, end) => onSelect(start, end)}/>
    </Detail>;
  }
}

export function AddLeaveDetail(props) {
  const [ dateRange, setDateRange ] = useState(() => {
    const start = new Date();
    return {
      start,
      end: new Date().setDate(start.getDate() + 1),
      selected: false
    };
  });
  const [ addLeave, addLeaveStatus ] = useMutation(ADD_LEAVE, { update: updateAfterAdd });
  if (addLeaveStatus.data) return <Redirect to={LIST_LEAVES + '?op=add'}/>;
  return <LeaveDetail id={Ids.ADD_LEAVE_CALENDAR}
                      from={dateRange.start} to={dateRange.end}
                      onSelect={(start, end) => { setDateRange({start, end, selected: true}) }}
                      enableOkButton={dateRange.selected}
                      onSubmit={() => {
                        addLeave({ variables: {
                            from: dateRange.start,
                            to: dateRange.end
                          }});
                        setDateRange({ ...dateRange, selected: false });
                      }}
                      {...props}/>
}

export function EditLeaveDetail(props) {
  const { loading, error, data } = useQuery(GET_LEAVE, {
    variables: { id: props.match.params.id }
  });
  if (loading) return <LoadingPanel subject={"Vacaciones"}/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  if (data === undefined) return <Redirect to={LIST_LEAVES}/>;
  return <LeaveDetail id={Ids.EDIT_LEAVE_CALENDAR} from={data.getLeave.from} to={data.getLeave.to} {...props}/>;
}
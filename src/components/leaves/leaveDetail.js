import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { RangedCalendarInput } from "../commons/forms/calendarInput";
import Detail from '../commons/detail';
import ErrorPanel from '../commons/errorPanel';
import { ADD_LEAVE, GET_LEAVE, UPDATE_LEAVE } from '../../data/queries/leaveQueries';
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
  constructor(){
    super();
    this.state = { show: true };
  }

  render() {
    const { from, id, notification, onSelect, title, to, ...props } = this.props;
    return <Detail title={title} {...props} cancelPath={LIST_LEAVES}>
      <Notification id={Ids.CONFIRMATION_MESSAGE} show={notification !== undefined && this.state.show}
                    onClick={() => this.setState({ show: false })}>
        { notification }
      </Notification>
      <p>Seleccione el rango del periodo vacacional:</p>
      <RangedCalendarInput from={from} id={id} to={to}
                           onRangeSelect={(start, end) => onSelect(start, end)}/>
    </Detail>;
  }
}

/**
 * Hook for data range state.
 * @return {{range.from}} Start of range.
 * @return {{range.to}} End of range.
 * @return {{range.selected}} Marks if there is a selected range.
 * @return {{setRange}} Range setter.
 */
function useRange() {
  const [ range, setRange ] = useState(() => {
    const from = new Date();
    return {
      from,
      to: new Date().setDate(from.getDate() + 1),
      selected: false
    };
  });
  return { range, setRange };
}

/**
 * Detail form for adding a new leave period.
 * @return {*}
 * @constructor
 */
export function AddLeaveDetail(props) {
  const { range, setRange } = useRange();
  const [ addLeave, addLeaveStatus ] = useMutation(ADD_LEAVE, { update: updateAfterAdd });

  if (addLeaveStatus.data) return <Redirect to={LIST_LEAVES + '?op=add'}/>;
  return <LeaveDetail id={Ids.ADD_LEAVE_CALENDAR}
                      from={range.from} to={range.to}
                      onSelect={(from, to) => { setRange({from, to, selected: true}) }}
                      enableOkButton={range.selected}
                      onSubmit={() => {
                        addLeave({ variables: {
                            from: range.from,
                            to: range.to
                          }});
                        setRange({ ...range, selected: false });
                      }}
                      {...props}/>
}

/**
 * Detail form for editing an existing leave period.
 * @param props.match.params.id ID of the leave period.
 * @return {*}
 * @constructor
 */
export function EditLeaveDetail(props) {
  const { loading, error, data } = useQuery(GET_LEAVE, {
    variables: { id: props.match.params.id }
  });
  const { range, setRange } = useRange();
  const [ updateLeave, updateLeaveStatus ] = useMutation(UPDATE_LEAVE);

  if (loading) return <LoadingPanel subject={"Vacaciones"}/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  if (data === undefined) return <Redirect to={LIST_LEAVES}/>;

  return <LeaveDetail id={Ids.EDIT_LEAVE_CALENDAR}
                      from={data.getLeave.from} to={data.getLeave.to}
                      enableOkButton={range.selected}
                      notification={ updateLeaveStatus.data === undefined ? undefined :
                        <>
                          <p>Periodo vacacional editado correctamente.</p>
                          <p><Link to={LIST_LEAVES}>Regresar a Vacaciones</Link></p>
                        </>}
                      onSelect={ (from, to) => setRange({
                        from, to, selected: true
                      })}
                      onSubmit={ () => {
                        updateLeave({ variables: {
                            id: props.match.params.id,
                            from: range.from,
                            to: range.to
                          }});
                        setRange({ ...range, selected: false });
                      }}
                      {...props}/>;
}
import React from 'react';
import { Redirect } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import {getDayIndex, getDayNames} from "../../utilities/daysOfWeek";
import { getMonthNames, getMonthIndex } from "../../utilities/months";
import { LIST_HOLIDAYS } from "../../constants/paths";
import { GET_HOLIDAY } from "../../data/queries/holidayQueries";
import capitalize from '../../utilities/capitalize';
import ErrorPanel from '../commons/errorPanel';
import getDetail from '../commons/getDetail';
import getFormControl from '../commons/forms/getFormControl';
import LoadingPanel from "../commons/loadingPanel";
import listGraphQLErrors from "../commons/listGraphQLErrors";

/**
 * Month selector.
 *
 * @param props.selectedMonth Index of selected month. 1 is January.
 * @return {*}
 * @constructor
 */
function MonthInput(props) {
  const { selectedMonth, ...otherProps } = props;
  const Input = getFormControl(<div className="select is-fullwidth">
    <select defaultValue={selectedMonth || 1}>
      {
        getMonthNames().map((month, m) => {
          return <option key={m} value={m + 1}>{capitalize(month)}</option>;
        })
      })}
    </select>
  </div>);
  return <Input {...otherProps}/>;
}

/**
 * Day of week selector.
 *
 * @param props.selectedDay Day of the week. Sunday is 0.
 * @return {*}
 * @constructor
 */
function WeekdayInput(props) {
  const { selectedDay, ...otherProps } = props;
  const Input = getFormControl(<div className="select is-fullwidth">
    <select defaultValue={selectedDay || 0}>
      {
        getDayNames().map((day, index) => {
          return <option key={day} value={index}>{capitalize(day)}</option>;
        })
      })}
    </select>
  </div>);
  return <Input {...otherProps}/>
}

/**
 * Generic numeric input.
 * @param props.currentValue Current input value.
 * @param props.maxValue Maximum value.
 * @return {*}
 * @constructor
 */
function NumberInput(props) {
  const { currentValue, maxValue, ...otherProps } = props;
  const Input = getFormControl(<input type="number" className="input" min="1" max={maxValue} defaultValue={currentValue}/>);
  return <Input {...otherProps}/>
}

export function FixedHolidayDetail(props) {
  const { id } = props.match.params;
  const { loading, error, data } = useQuery(GET_HOLIDAY, { variables: { id }});
  if (loading) return <LoadingPanel subject="día feriado"/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  if (data === undefined) return <Redirect to={LIST_HOLIDAYS}/>;
  const detail = () => <form className="columns">
    <NumberInput className="column is-4" caption="Día" maxValue="31" currentValue={data.getHoliday.day}/>
    <MonthInput className="column is-4" caption="Mes" selectedMonth={getMonthIndex(data.getHoliday.month)}/>
  </form>;

  const HolidayDetail = getDetail(detail);
  return <HolidayDetail {...props} cancelPath={LIST_HOLIDAYS}/>;
}

export function VariableHolidayDetail(props) {
  const { id } = props.match.params;
  const { loading, error, data } = useQuery(GET_HOLIDAY, { variables: { id }});
  if (loading) return <LoadingPanel subject="día feriado"/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  if (data === undefined) return <Redirect to={LIST_HOLIDAYS}/>;
  const detail = () => <form className="columns">
    <NumberInput className="column is-4" caption="#" maxValue="4" currentValue={data.getHoliday.week}/>
    <WeekdayInput className="column is-4" caption="Día" selectedDay={getDayIndex(data.getHoliday.dayOfWeek)}/>
    <MonthInput className="column is-4" caption="Mes" selectedMonth={getMonthIndex(data.getHoliday.month)}/>
  </form>;

  const HolidayDetail = getDetail(detail);
  return <HolidayDetail {...props} cancelPath={LIST_HOLIDAYS}/>
}
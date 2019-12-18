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
  const Input = getFormControl(() => <div className="select is-fullwidth">
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
  const Input = getFormControl(() => <div className="select is-fullwidth">
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
  const Input = getFormControl(() => <input type="number" className="input" min="1" max={maxValue} defaultValue={currentValue}/>);
  return <Input {...otherProps}/>
}

/**
 * Gets the detail form for fixed holidays.
 * @param props.day Day of the month.
 * @param props.month Uppercase name of the month.
 *
 * @type {Function} A component containing a fixed holiday form.
 */
const FixedDetail = getDetail((props) => <form className="columns">
    <NumberInput className="column is-4" caption="Día" maxValue="31" currentValue={props.day}/>
    <MonthInput className="column is-4" caption="Mes" selectedMonth={getMonthIndex(props.month)}/>
  </form>);

export function AddFixedHolidayDetail(props) {
  const { day, month, ...otherProps } = props;
  return <FixedDetail {...otherProps} day={day} month={month} cancelPath={LIST_HOLIDAYS} />
}

export function EditFixedHolidayDetail(props) {
  const { id } = props.match.params;
  const { loading, error, data } = useQuery(GET_HOLIDAY, { variables: { id }});
  if (loading) return <LoadingPanel subject="día feriado"/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  if (data === undefined) return <Redirect to={LIST_HOLIDAYS}/>;

  const { day, month } = data.getHoliday;
  return <FixedDetail {...props} day={day} month={month} cancelPath={LIST_HOLIDAYS}/>;
}

/**
 * Gets the detail form for variable holidays.
 * @param props.dayOfWeek Uppercase name of a day of the week.
 * @param props.week Index of week.
 * @param props.month Uppercase name of a month.
 *
 * @type {Function} A component containing a variable holiday form.
 */
const VariableDetail = getDetail((props) => <form className="columns">
  <NumberInput className="column is-4" caption="#" maxValue="4" currentValue={props.week}/>
  <WeekdayInput className="column is-4" caption="Día" selectedDay={getDayIndex(props.dayOfWeek)}/>
  <MonthInput className="column is-4" caption="Mes" selectedMonth={getMonthIndex(props.month)}/>
</form>);

export function AddVariableHolidayDetail(props) {
  return <VariableDetail {...props} cancelPath={LIST_HOLIDAYS}/>;
}

export function EditVariableHolidayDetail(props) {
  const { id } = props.match.params;
  const { loading, error, data } = useQuery(GET_HOLIDAY, { variables: { id }});
  if (loading) return <LoadingPanel subject="día feriado"/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  if (data === undefined) return <Redirect to={LIST_HOLIDAYS}/>;

  const { week, dayOfWeek, month } = data.getHoliday;
  return <VariableDetail {...props} week={week} dayOfWeek={dayOfWeek} month={month} cancelPath={LIST_HOLIDAYS}/>
}
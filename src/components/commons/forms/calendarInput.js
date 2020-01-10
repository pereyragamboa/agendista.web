import React from 'react';
import bulmaCalendar from "bulma-calendar";
import getFormControl from './getFormControl';

/**
 * Date input formatted with Bulma calendar.
 *
 * @type {*}
 */
const CalendarInput = getFormControl((props) =>
    <input className="input" data-display-mode="inline" type="date" {...props}/>);

/**
 * Date input formatted with Bulma ranged calendar.
 *
 * @type {*}
 */
const RangedCalendarInput = getFormControl((props) =>
  <input className="input" type="date"
         data-display-mode="inline"
         data-is-range="true"
         data-start-date={shiftDate(new Date(props.from))}
         data-end-date={shiftDate(new Date(props.to))}
  />);

/**
 * Changes an UTC date to local time
 * @param utcDate a date string in ISO 8601 / JSON format.
 * @return {Date} a Date object with year, month and day equal to the original date.
 */
const shiftDate = (utcDate) => new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate());

/**
 * Initializes Bulma calendars.
 */
function attachCalendars() {
  const now = new Date();
  // Attaches date input to Bulma Calendar and configures it once the
  // component is mounted
  return bulmaCalendar.attach("input[type='date']", {
    minDate: now,
  });
}

export { attachCalendars, CalendarInput, RangedCalendarInput };
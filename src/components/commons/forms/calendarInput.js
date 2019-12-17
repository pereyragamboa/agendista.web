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
       data-start-date={new Date(props.from).toUTCString()}
       data-end-date={new Date(props.to).toUTCString()}
     />
);

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
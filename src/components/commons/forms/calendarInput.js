import React from 'react';
import bulmaCalendar from "bulma-calendar";
import getFormControl from './getFormControl';

/**
 * Date input formatted with Bulma calendar.
 *
 * @type {*}
 */
const CalendarInput = getFormControl(() =>
    <input className="input" data-display-mode="inline" type="date"/>);

/**
 * Date input formatted with Bulma ranged calendar.
 *
 * @type {*}
 */
const RangedCalendarInput = getFormControl(() =>
    <input className="input" data-display-mode="inline" data-is-range="true" type="date"/>);

/**
 * Initializes Bulma calendars.
 */
function attachCalendars() {
  const now = new Date();
  // Attaches date input to Bulma Calendar and configures it once the
  // component is mounted
  bulmaCalendar.attach("input[type='date']", {
    minDate: now,
    maxDate: now.setFullYear(now.getFullYear() + 1)
  });
}

export { attachCalendars, CalendarInput, RangedCalendarInput };
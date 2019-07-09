import React from 'react';
import getFormControl from './getFormControl';
import bulmaCalendar from "bulma-calendar";

const CalendarInput = getFormControl(
    <input className="input" data-display-mode="inline" type="date"/>);

const RangedCalendarInput = getFormControl(
    <input className="input" data-display-mode="inline" data-is-range="true" type="date"/>);

function attachCalendars() {
  // Attaches date input to Bulma Calendar and configures it once the
  // component is mounted
  bulmaCalendar.attach("input[type='date']", {
    minDate: new Date(),

  });
}

export { attachCalendars, CalendarInput, RangedCalendarInput };
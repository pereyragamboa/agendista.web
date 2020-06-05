import React, { useEffect } from 'react';
import bulmaCalendar from "bulma-calendar";
import FormControl from "./formControl";

/**
 * Date input formatted with Bulma calendar.
 *
 * @type {*}
 */
const CalendarInput =({id, ...props}) => <FormControl inputElement={
    <input id={id} className="input" data-display-mode="inline" type="date" {...props}/>}/>;

/**
 * Date input formatted with Bulma ranged calendar.
 *
 * @param id Identifier of the inner <input> element.
 * @param from Start date.
 * @param onRangeSelect Function for handling the selection of a date range.
 * It takes two parameters: startDate and endDate.
 * @param to End date.
 * @param props Other properties of <FormControl>.
 * @see FormControl
 * @type {*}
 */
const RangedCalendarInput = ({ id, from, onRangeSelect, to, ...props }) => {
  useAttachCalendars(id, onRangeSelect);
  return <FormControl inputElement={
      <input id={id} className="input" type="date"
             data-display-mode="inline"
             data-is-range="true"
             data-start-date={shiftDate(new Date(from))}
             data-end-date={shiftDate(new Date(to))}
      />
  } {...props} />
};


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

/**
 * Hook for registering the calendar input.
 * @param calendarId Calendar input identifier.
 * @param onDateSelect Function for handling the date selection.
 */
function useAttachCalendars(calendarId, onDateSelect) {
  useEffect(() => {
    if (calendarId) {
      const now = new Date();
      // Attaches date input to Bulma Calendar and configures it once the
      // component is mounted
      bulmaCalendar.attach(`#${calendarId}`, {
        minDate: now,
      });

      if (typeof onDateSelect === 'function') {
        // Registers onSelect event handler
        const calendar = document.getElementById(calendarId).bulmaCalendar;
        calendar.on("select", datePicker =>
            onDateSelect(datePicker.data.startDate, datePicker.data.endDate)
        );
      }
    }
  });
}

export { attachCalendars, CalendarInput, RangedCalendarInput };
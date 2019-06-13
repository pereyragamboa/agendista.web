import React from 'react';
import daysOfWeek from "../../daysOfWeek";

const SATURDAY = 6;
const SUNDAY = 0;

/**
 * Capitalizes a string.
 *
 * @param {string} str The string to be capitalized.
 * @return {string} The capitalized string; if str is not a string, returns str
 */
const capitalize = (str) => {
  if (typeof str !== 'string' || str.length === 0) {
    // If it is not a string, or the string is empty, return input
    return str;
  } else {
    return [str[0].toUpperCase(), str.substr(1)].join('');
  }
};

/**
 * Hour list item.
 *
 * @param {string} props.day Day of the week.
 * @return {*}
 * @constructor
 */
function HourListItem(props) {
  const className = "ag-class-hours-" + props.id;

  return <tr>
    <th className="control">
      <label className="checkbox">
        <input type="checkbox"/>
        {props.tag}
      </label>
    </th>
    <td className={className}>
      <div className="field">
        <input className="input" type="time"/>
      </div>
    </td>
    <td className={className}>
      <div className="field">
        <input className="input" type="time"/>
      </div>
    </td>
  </tr>
}

export default function () {
  return <div className="box">
    <table className="table is-fullwidth">
      <tbody className="table-container">
        <tr>
          <td/>
          <th>Apertura</th>
          <th>Cierre</th>
        </tr>
        <HourListItem id="ag-workday" tag="Entre semana"/>
        <HourListItem id="ag-saturday" tag={capitalize(daysOfWeek.getDayName(SATURDAY))}/>
        <HourListItem id="ag-sunday" tag={capitalize(daysOfWeek.getDayName(SUNDAY))}/>
      </tbody>
    </table>
  </div>;
};

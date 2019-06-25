import React from 'react';
import { fixedHoliday } from "../../models/fixedHoliday";
import ListItemButtons from '../commons/listItemButtons';
import {variableHoliday} from "../../models/variableHoliday";

const HolidayListRow = (props) =>
  <tr>
    <th>
      {props.date.toLocaleDateString("default", {month: "long", day: "numeric"})}
      {props.isVariable ? (
          <span>
            <span className="is-hidden-touch">&nbsp;</span>
            <br className="is-hidden-desktop"/>
            <span className="tag is-info">Variable</span>
          </span>) : ''}
    </th>
    <td>
      <ListItemButtons/>
    </td>
  </tr>;

const fixedHolidays = [
  fixedHoliday(1, 1), fixedHoliday(5, 1), fixedHoliday(9, 16), fixedHoliday(12, 25)
];
const variableHolidays = [
  variableHoliday(2, 1, 1),
  variableHoliday(3, 3, 1),
  variableHoliday(11, 3, 1)
];

export default function HolidayList() {
  const currentYear = new Date().getFullYear();
  const allHolidayData = [
    ...fixedHolidays.map(
        (fixed) => ({ date: fixed.getHolidayDate(currentYear), isVariable: false })
    ),
    ...variableHolidays.map(
        (variable) => ({ date: variable.getHolidayDate(currentYear), isVariable: true })
    )
  ].sort((holiday1, holiday2) => holiday1.date - holiday2.date);

  return (
    <React.Fragment>
      <h2 className="subtitle">Días no laborales en {currentYear}</h2>
      <p className="content">
        Los clientes no podrán agendar citas en estos días.
      </p>
      <div className="box">
        <table className="table is-fullwidth">
          <tbody className="table-container">{
            allHolidayData.map((holiday) =>
                <HolidayListRow date={holiday.date} isVariable={holiday.isVariable}/>)
          }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
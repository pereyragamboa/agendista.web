import React from 'react';
import * as Paths from '../../constants/paths';
import { fixedHoliday } from "../../models/fixedHoliday";
import getIndex from '../commons/getIndex';
import ListItemButtons from '../commons/listItemButtons';
import NavbarMenuItem from '../commons/navbarMenuItem';
import {variableHoliday} from "../../models/variableHoliday";

/**
 * Holiday list item.
 * @param props.date Holiday date.
 * @param props.isVariable The holiday is a variable, non-fixed date
 * @return {*}
 * @constructor
 */
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

  //This is only for demo purposes
const fixedHolidays = [
  fixedHoliday(1, 1), fixedHoliday(5, 1), fixedHoliday(9, 16), fixedHoliday(12, 25)
];
const variableHolidays = [
  variableHoliday(2, 1, 1),
  variableHoliday(3, 3, 1),
  variableHoliday(11, 3, 1)
];

export default function HolidayList(props) {
  const currentYear = new Date().getFullYear();
  // Merges fixed and movable holidays
  const allHolidayData = [
    ...fixedHolidays.map(
        (fixed) => ({ date: fixed.getHolidayDate(currentYear), isVariable: false })
    ),
    ...variableHolidays.map(
        (variable) => ({ date: variable.getHolidayDate(currentYear), isVariable: true })
    )
  ].sort((holiday1, holiday2) => holiday1.date - holiday2.date);

  const indexBody = <React.Fragment>
      <p className="content">
        Los clientes no podrán agendar citas en estos días.
      </p>
      <table className="table is-fullwidth">
        <tbody className="table-container">{
          allHolidayData.map((holiday) =>
              <HolidayListRow date={holiday.date} isVariable={holiday.isVariable}/>)
        }
        </tbody>
      </table>
    </React.Fragment>;

  const navbarComponents = <NavbarMenuItem caption="Nuevo día feriado" featherIcon="plus"/>;

  const HolidaysIndex = getIndex(indexBody, {endItems: navbarComponents});

  return <HolidaysIndex {...props} brand={`Días feriados en ${currentYear}`} featherIcon="sun" />
};
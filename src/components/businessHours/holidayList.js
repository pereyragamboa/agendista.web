import React from 'react';
import { Link } from 'react-router-dom';
import * as Paths from '../../constants/paths';
import { DELETE_HOLIDAY_MODAL } from "../../constants/modalIds";
import { fixedHoliday } from "../../models/fixedHoliday";
import { HOLIDAYS } from "../../constants/headers";
import { variableHoliday } from "../../models/variableHoliday";
import DeleteModal from '../commons/deleteModal';
import getIndex from '../commons/getIndex';
import ListItemButtons from '../commons/listItemButtons';
import NavbarMenuItem from '../commons/navbarMenuItem';

/**
 * Holiday list item.
 * @param props.date Holiday date.
 * @param props.isVariable The holiday is a variable, non-fixed date
 * @return {*}
 * @constructor
 */
const HolidayListRow = (props) => <tr>
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
    <ListItemButtons editPath={props.isVariable ? Paths.ADD_VARIABLE_HOLIDAY : Paths.ADD_FIXED_HOLIDAY} deleteModalId={DELETE_HOLIDAY_MODAL}/>
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
  // Gets current and displayed year
  const currentYear = new Date().getFullYear();
  const displayYear = Number.parseInt(props.match.params.year) || currentYear;

  function getSelectedYearClass(className, isSelected) {
    return [className, isSelected ? "is-link" : ''].join(' ');
  }

  // Merges fixed and movable holidays
  const allHolidayData = [
    ...fixedHolidays.map(
        (fixed) => ({ date: fixed.getHolidayDate(displayYear), isVariable: false })
    ),
    ...variableHolidays.map(
        (variable) => ({ date: variable.getHolidayDate(displayYear), isVariable: true })
    )
  ].sort((holiday1, holiday2) => holiday1.date - holiday2.date);

  const indexBody = <React.Fragment>
      <div className="content">
        <p>Los clientes no podrán agendar citas en estos días.</p>
        <p>Ver días feriados para: {
          // Links for holidays in current and next year
          [currentYear, currentYear + 1].map((year) => {
            const className = getSelectedYearClass("tag is-medium", year === displayYear);
            return <Link key={year} className={className} to={Paths.LIST_HOLIDAYS + year}>{year}</Link>;
          })
        }</p>
      </div>
      <table className="table is-fullwidth">
        <tbody className="table-container">{
          allHolidayData.map((holiday) =>
              <HolidayListRow key={holiday.date} date={holiday.date} isVariable={holiday.isVariable}/>)
        }
        </tbody>
      </table>
    <DeleteModal id={DELETE_HOLIDAY_MODAL}>¿Desea eliminar este día feriado?</DeleteModal>
    </React.Fragment>;

  const navbarComponents = <React.Fragment>
    <NavbarMenuItem featherIcon="plus"/>
    <NavbarMenuItem caption="Nuevo día fijo" path={Paths.ADD_FIXED_HOLIDAY}/>
    <NavbarMenuItem caption="Nuevo día variable" path={Paths.ADD_VARIABLE_HOLIDAY}/>
  </React.Fragment>;

  const HolidaysIndex = getIndex(indexBody, {endItems: navbarComponents});

  return <HolidaysIndex {...props} brand={HOLIDAYS} featherIcon="flag" />
};
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { HOLIDAYS } from "../../constants/headers";
import { DELETE_HOLIDAY_MODAL } from "../../constants/modalIds";
import * as Paths from '../../constants/paths';
import ErrorPanel from '../commons/errorPanel';
import getIndex from '../commons/getIndex';
import listGraphQLErrors from '../commons/listGraphQLErrors';
import ListItemButtons from '../commons/listItemButtons';
import LoadingPanel from '../commons/loadingPanel';
import DeleteModal from '../commons/modals/deleteModal';
import NavbarMenuItem from '../commons/navbars/navbarMenuItem';
import { GET_ALL_HOLIDAYS } from "../../data/queries/holidayQueries";
import { fixedHoliday } from "../../models/fixedHoliday";
import { variableHoliday } from "../../models/variableHoliday";
import { getDayIndex } from "../../utilities/daysOfWeek";
import { getMonthIndex } from "../../utilities/months";

/**
 * Holiday list item.
 * @param props.date Holiday date.
 * @param props.isVariable The holiday is a variable, non-fixed date
 * @return {*}
 * @constructor
 */
function HolidayListRow(props) {
  const editPath = props.isVariable ? Paths.UPDATE_VARIABLE_HOLIDAY : Paths.UPDATE_FIXED_HOLIDAY;
  return <tr>
    <th>
      {props.date.toLocaleDateString("default", {month: "long", day: "numeric"})}
      {props.isVariable ? (<React.Fragment>
        <span className="is-hidden-touch">&nbsp;</span>
        <br className="is-hidden-desktop"/>
        <span className="tag is-info">Variable</span>
      </React.Fragment>) : ''}
    </th>
    <td>
      <ListItemButtons editPath={`${editPath}${props.id}`} deleteModalId={DELETE_HOLIDAY_MODAL}/>
    </td>
  </tr>;
}

export default function HolidayList(props) {
  // Gets data
  const { loading, error, data } = useQuery(GET_ALL_HOLIDAYS);

  if (loading) return <LoadingPanel subject={HOLIDAYS}/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;

  // Gets current and displayed year
  const currentYear = new Date().getFullYear();
  const displayYear = Number.parseInt(props.match.params.year) || currentYear;

  function getSelectedYearClass(className, isSelected) {
    return [className, isSelected ? "is-link" : ''].join(' ');
  }

  // Merges fixed and movable holidays
  const allHolidayData = data.getHolidays.map(h => {
    if (h.__typename === 'FixedHoliday') {
      const fixed = new fixedHoliday(getMonthIndex(h.month), h.day);
      return {id: h.id, date: fixed.getHolidayDate(displayYear), isVariable: false};
    }
    else if (h.__typename === 'VariableHoliday') {
      const variable = new variableHoliday(getMonthIndex(h.month), h.week, getDayIndex(h.dayOfWeek));
      return {id: h.id, date: variable.getHolidayDate(displayYear), isVariable: true};
    }
    else return {}
  }).sort((holiday1, holiday2) => holiday1.date - holiday2.date);

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
              <HolidayListRow id={holiday.id} key={holiday.date} date={holiday.date} isVariable={holiday.isVariable}/>)
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
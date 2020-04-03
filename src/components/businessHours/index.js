import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as Paths from '../../constants/paths';
import * as daysOfWeek from "../../utilities/daysOfWeek";
import capitalize from '../../utilities/capitalize';
import ErrorPanel from '../commons/errorPanel';
import getIndex from '../commons/getIndex';
import listGraplQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import { WORKING_HOURS} from "../../constants/headers";
import { GET_BUSINESS_HOURS, BusinessDays } from "../../data/queries/businessHoursQueries";

const SATURDAY = 6;
const SUNDAY = 0;

export const ClassNames = {
  HOUR_LIST_ITEM: "ag-business-hours-list-item",
  HOUR_LIST_DAY_FIELD: "ag-business-hour-day-field",
  HOUR_LIST_FROM_FIELD: "ag-business-hour-from-field",
  HOUR_LIST_TO_FIELD: "ag-business-hour-to-field"
};

export const DefaultValues = {
  FROM_TIME: "09:00",
  TO_TIME: "18:00"
};

/**
 * Map of (localized) tags for business day constants.
 * @type {Map<string, string>}
 */
const dayNamesMap = new Map();
// todo: Localize this
dayNamesMap.set(BusinessDays.WEEKDAYS, 'Entre semana');
dayNamesMap.set(BusinessDays.SATURDAY, capitalize(daysOfWeek.getDayName(SATURDAY)));
dayNamesMap.set(BusinessDays.SUNDAY, capitalize(daysOfWeek.getDayName(SUNDAY)));

/**
 * Gets the standard HTML time string from an UTC time stamp
 *
 * @param t Number of milliseconds since UNIX epoch.
 * @return {string} A time string in 24-hour format.
 */

/**
 * Hour list item.
 *
 * @param {boolean} props.enabled The business hours are defined for this item.
 * @param {number} props.from Opening hour.
 * @param {string} props.businessDay One of the business day constants.
 * @param {number} props.to Closing hour.
 * @return {*}
 * @constructor
 */
function HourListItem(props) {
  const fromTime = props.from ? props.from : DefaultValues.FROM_TIME;
  const toTime = props.to ? props.to : DefaultValues.TO_TIME;

  return <tr id={props.id} className={ClassNames.HOUR_LIST_ITEM}>
    <th className="control">
      <label className="checkbox">
        <input className={ClassNames.HOUR_LIST_DAY_FIELD}
               type="checkbox" defaultChecked={props.enabled}
               value={props.businessDay}/>
        {dayNamesMap.get(props.businessDay)}
      </label>
    </th>
    <td>
      <div className="field">
        <input className={`input ${ClassNames.HOUR_LIST_FROM_FIELD}`}
               type="time" defaultValue={fromTime}/>
      </div>
    </td>
    <td>
      <div className="field">
        <input className={`input ${ClassNames.HOUR_LIST_TO_FIELD}`}
               type="time" defaultValue={toTime}/>
      </div>
    </td>
  </tr>
}

export default function HoursList(props) {
  const q = useQuery(GET_BUSINESS_HOURS);
  const { loading, error, data } = q;
  if (loading) return <LoadingPanel subject={WORKING_HOURS}/>;
  if (error) return <ErrorPanel>{listGraplQLErrors(error)}</ErrorPanel>;
  // Add query results to a hash map for easier, cleaner page population
  const hoursMap = new Map(data.getBusinessHours.map(b => {
    const { day, ..._ } = b;
    return [day, _];
  }));

  const detailItems = [
      BusinessDays.WEEKDAYS, BusinessDays.SATURDAY, BusinessDays.SUNDAY
  ].map(day => {
    const b = hoursMap.get(day) || {};
    return <HourListItem key={`ag-${day.toLowerCase()}`}
                         businessDay={day}
                         enabled={hoursMap.has(day)}
                         from={b.startTime} to={b.endTime}/>;
  });

  const detailBody =
      <table className="table is-fullwidth">
        <tbody className="table-container">
        <tr>
          <td/>
          <th>Apertura</th>
          <th>Cierre</th>
        </tr>
        { detailItems }
        </tbody>
      </table>;

  const HoursList = getIndex(detailBody);

  return <HoursList {...props} brand={WORKING_HOURS} featherIcon="clock"
                      okCaption="Guardar" cancelPath={Paths.HOME} />
}
import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import * as Paths from '../../constants/paths';
import * as daysOfWeek from "../../utilities/daysOfWeek";
import capitalize from '../../utilities/capitalize';
import ErrorPanel from '../commons/errorPanel';
import getIndex from '../commons/getIndex';
import { getTimeString } from "../../utilities/times";
import listGraplQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import { WORKING_HOURS} from "../../constants/headers";

const DAYS = ['WEEKDAYS', 'SATURDAY', 'SUNDAY'];
const SATURDAY = 6;
const SUNDAY = 0;

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
 * @param {string} props.tag Label of the list item, identifying the day.
 * @param {number} props.to Closing hour.
 * @return {*}
 * @constructor
 */
function HourListItem(props) {
  const className = "ag-class-hours-" + props.id;
  const fromTime = props.from ? getTimeString(props.from) : "09:00";
  const toTime = props.to ? getTimeString(props.to) : "18:00";

  return <tr>
    <th className="control">
      <label className="checkbox">
        <input type="checkbox" defaultChecked={props.enabled}/>
        {props.tag}
      </label>
    </th>
    <td className={className}>
      <div className="field">
        <input className="input" type="time" defaultValue={fromTime}/>
      </div>
    </td>
    <td className={className}>
      <div className="field">
        <input className="input" type="time" defaultValue={toTime}/>
      </div>
    </td>
  </tr>
}

export default function HoursList(props) {
  const { loading, error, data } = useQuery(
      gql`
        query { getBusinessHours (profileId: "0x30001") {
            id
            day
            startTime
            endTime
        }}
      `);
  if (loading) return <LoadingPanel subject={WORKING_HOURS}/>;
  if (error) return <ErrorPanel>{listGraplQLErrors(error)}</ErrorPanel>;
  // Add query results to a hash map for easier, cleaner page population
  const hoursMap = new Map(data.getBusinessHours.map(b => {
    const { day, ..._ } = b;
    return [day, _];
  }));

  const dayNamesMap = new Map();
  // todo: Localize this
  dayNamesMap.set('WEEKDAYS', 'Entre semana');
  dayNamesMap.set('SATURDAY', capitalize(daysOfWeek.getDayName(SATURDAY)));
  dayNamesMap.set('SUNDAY', capitalize(daysOfWeek.getDayName(SUNDAY)));
  const detailItems = DAYS.map(day => {
    const b = hoursMap.get(day) || {};
    return <HourListItem key={`ag-${day.toLowerCase()}`}
                         tag={dayNamesMap.get(day)}
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
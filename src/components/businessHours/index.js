import React from 'react';
import * as Paths from '../../constants/paths';
import * as daysOfWeek from "../../utilities/daysOfWeek";
import capitalize from '../../utilities/capitalize';
import getIndex from '../commons/getIndex';
import { WORKING_HOURS} from "../../constants/headers";

const SATURDAY = 6;
const SUNDAY = 0;

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

export default function HoursList(props) {
  const detailBody =
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
      </table>;

  const HoursList = getIndex(detailBody);

  return <HoursList {...props} brand={WORKING_HOURS} featherIcon="clock"
                      okCaption="Guardar" cancelPath={Paths.HOME} />
}
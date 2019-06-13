import React from 'react';
import { Link, Route } from 'react-router-dom';
import * as Paths from '../../paths';
import HourList from './hoursList';
import HolidayList from './holidayList';

const TABS_ID = "ag-businessHourTabs";
const HOLIDAY_TAB_ID = "ag-holidayTab";
const HOUR_TAB_ID = "ag-hourTab";

/**
 * Business hours index page.
 *
 * Because the layout is so different from other index pages, this component does not use {@see getIndex}.
 *
 * @constructor
 * @return A React component.
 * @author Martín Pereyra <pereyra.gamboa@outlook.com>
 */
function BusinessHours() {
  return <div>
    <h1 className="title">Horarios de atención</h1>
    <div className="tabs is-boxed is-toggle">
      <ul id={TABS_ID}>
        <li id={HOUR_TAB_ID} className="is-active">
          <Link to={Paths.LIST_HOURS}>Horarios de atención</Link>
        </li>
        <li id={HOLIDAY_TAB_ID}>
          <Link to={Paths.LIST_HOLIDAYS}>Días no laborales</Link>
        </li>
      </ul>
    </div>
    <div>
      <Route exact path={Paths.LIST_HOURS} component={HourList}/>
      <Route exact path={Paths.LIST_HOLIDAYS} component={HolidayList}/>
    </div>
  </div>
}

export default BusinessHours;
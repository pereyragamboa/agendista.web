import React from 'react';
import { LIST_HOLIDAYS } from "../../constants/paths";
import { getDayNames } from "../../models/daysOfWeek";
import { getMonthNames } from "../../models/months";
import capitalize from '../../utilities/capitalize';
import getDetail from '../commons/getDetail';
import getFormControl from '../commons/forms/getFormControl';

function MonthInput(props) {
  let m = 0;
  const Input = getFormControl(<div className="select is-fullwidth">
    <select>
      {
        getMonthNames().map(month => {
          return <option key={m} value={m++}>{capitalize(month)}</option>;
        })
      })}
    </select>
  </div>);
  return <Input {...props}/>;
}

function WeekdayInput(props) {
  let d = 0;
  const Input = getFormControl(<div className="select is-fullwidth">
    <select>
      {
        getDayNames().map(day => {
          return <option key={d} value={d++}>{capitalize(day)}</option>;
        })
      })}
    </select>
  </div>);
  return <Input {...props}/>
}

function NumberInput(props) {
  const { maxValue, ...otherProps } = props;
  const Input = getFormControl(<input type="number" className="input" min="1" max={maxValue}/>);
  return <Input {...otherProps}/>
}

export function FixedHolidayDetail(props) {
  const detail = () => <form className="columns">
    <NumberInput className="column is-4" caption="Día" maxValue="31"/>
    <MonthInput className="column is-4" caption="Mes"/>
  </form>;

  const HolidayDetail = getDetail(detail);
  return <HolidayDetail {...props} cancelPath={LIST_HOLIDAYS}/>;
}

export function VariableHolidayDetail(props) {
  const detail = () => <form className="columns">
    <NumberInput className="column is-4" caption="#" maxValue="4"/>
    <WeekdayInput className="column is-4" caption="Día"/>
    <MonthInput className="column is-4" caption="Mes"/>
  </form>;

  const HolidayDetail = getDetail(detail);
  return <HolidayDetail {...props} cancelPath={LIST_HOLIDAYS}/>
}
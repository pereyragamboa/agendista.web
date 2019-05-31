import React from 'react';
import FeatherIcon from '../commons/featherIcon';

// Row of an appointment list.
const AppointmentListElement = (props) =>
  <tr>
    <td className="level">
      <div className="level-left">
        <span className="has-text-weight-bold">{props.time}:&nbsp;</span>{props.name}
      </div>
    {
      props.showButtons ? (
          <div className="level-right">
            <div className="buttons level-item">
              <button className="button is-info"><FeatherIcon iconName="edit-2"/></button>
              <button className="button is-danger"><FeatherIcon iconName="trash-2"/></button>
            </div>
          </div>) : ''
    }
    </td>
  </tr>
;

export default function AppointmentList (props) {
  return (
      <table className="table is-fullwidth is-hoverable">
        <tbody>
          <AppointmentListElement name="Rosa Guadalupe" time="10:00" showButtons={props.showButtons} />
          <AppointmentListElement name="Juan Salvador" time="11:00" showButtons={props.showButtons} />
        </tbody>
      </table>
  )
};
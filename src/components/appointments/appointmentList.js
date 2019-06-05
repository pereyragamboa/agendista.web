import React from 'react';
import FeatherIcon from '../commons/featherIcon';

// Row of an appointment list.
const AppointmentListElement = (props) =>
  <tr>
    <th>{props.time}</th>
    <td>{props.name}</td>
    {
      props.showButtons ? (
          <td className="level-right">
            <div className="buttons level-item">
              <button className="button is-primary"><FeatherIcon iconName="edit-2"/></button>
              <button className="button is-danger"><FeatherIcon iconName="trash-2"/></button>
            </div>
          </td>) : ''
    }
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
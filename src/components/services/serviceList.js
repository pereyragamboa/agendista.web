import React from 'react';
import FeatherButton from '../commons/featherButton';

const ServiceListRow = (props) =>
  <tr>
    <th>{ props.serviceName }</th>
    <td className="is-hidden-touch">{ props.serviceTime }</td>
    <td className="is-hidden-touch">{ props.servicePrice }</td>
    <td>
      <div className="level-right">
        <div className="buttons level-item">
          <FeatherButton className="is-primary" featherIcon="edit-2"/>
          <FeatherButton className="is-danger" featherIcon="trash-2"/>
        </div>
      </div>
    </td>
  </tr>;

export default function ServiceList() {
  return <table className="table is-fullwidth">
    <tbody className="table-container">
    {
      [1, 2, 3].map(item =>
          <ServiceListRow serviceName={`Servicio ${item}`}
                          serviceTime={ new Date(0, 0, 0, 0, 30 * item, 0).toLocaleTimeString("default", {
                            hour: "numeric",
                            minute: "2-digit"
                          }) }
                          servicePrice={`$ ${item * 100}`}
      /> )
    }
    </tbody>
  </table>
};
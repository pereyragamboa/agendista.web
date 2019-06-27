import React from 'react';
import * as Paths from '../../paths';
import DeleteModal from '../commons/deleteModal';
import ListItemButtons from '../commons/listItemButtons';

const MODAL_ID = "ag-deleteServiceModal";

/**
 *
 * @param props.serviceName Name of the service.
 * @param props.servicePrice Cost that the provider charges to the service.
 * @param props.serviceTime Time that takes the provider to fulfull the service.
 * @return {*}
 * @constructor
 */
const ServiceListRow = (props) =>
  <tr>
    <th>{ props.serviceName }</th>
    <td className="is-hidden-touch">{ props.serviceTime }</td>
    <td className="is-hidden-touch">{ props.servicePrice }</td>
    <td>
      <div className="level-right">
        <ListItemButtons editPath={Paths.UPDATE_SERVICE} deleteModalId={MODAL_ID}/>
      </div>
    </td>
  </tr>;

export default function ServiceList() {
  return <React.Fragment>
    <table className="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Servicio</th>
          <th className="is-hidden-touch">Tiempo</th>
          <th className="is-hidden-touch">Costo</th>
          <th/>
        </tr>
      </thead>
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
    <DeleteModal id={MODAL_ID}>
      ¿Desea eliminar este servicio?
    </DeleteModal>
  </React.Fragment>
};
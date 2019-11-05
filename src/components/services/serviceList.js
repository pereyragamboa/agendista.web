import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import * as Paths from '../../constants/paths';
import { DELETE_SERVICE_MODAL as MODAL_ID } from "../../constants/modalIds";
import DeleteModal from '../commons/modals/deleteModal';
import ListItemButtons from '../commons/listItemButtons';

/**
 * Row element showing service information.
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

/**
 * List of available services.
 *
 * @return {*}
 * @constructor
 */
export default function ServiceList() {
  const { loading, error, data } = useQuery(gql`{
      getServices(profileId: "0x30001") {
          id
          name
          duration
          price
      }
  }`);
  if (loading) return <p>Cargando servicios...</p>;
  if (error) return <p>Error: {error}</p>;
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
        data.getServices.map(service =>
            <ServiceListRow key={`ag-service-id-${service.id}`} serviceName={service.name}
                            serviceTime={ new Date(0, 0, 0, 0, service.duration, 0).toLocaleTimeString("default", {
                              hour: "numeric",
                              minute: "2-digit"
                            }) }
                            servicePrice={`$ ${service.price}`}
            />
        )
      }
      </tbody>
    </table>
    <DeleteModal id={MODAL_ID}>
      ¿Desea eliminar este servicio?
    </DeleteModal>
  </React.Fragment>
};
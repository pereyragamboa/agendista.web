import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as Paths from '../../constants/paths';
import { DELETE_SERVICE_MODAL as MODAL_ID } from "../../constants/modalIds";
import DeleteModal from '../commons/modals/deleteModal';
import ErrorPanel from '../commons/errorPanel';
import { getTimeString } from "../../utilities/times";
import ListItemButtons from '../commons/listItemButtons';
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import { SERVICES } from '../../constants/headers';
import { GET_ALL_SERVICES } from "../../data/queries/serviceQueries";

export const ClassNames = {
  SERVICE_LIST: "ag-service-list",
  SERVICE_LIST_ITEM: "ag-service-list-item",
  SERVICE_LIST_NAME_LABEL: "ag-service-list-item-name",
  SERVICE_LIST_TIME_LABEL: "ag-service-list-item-time",
  SERVICE_LIST_PRICE_LABEL: "ag-service-list-item-price"
};

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
  <tr className={ClassNames.SERVICE_LIST_ITEM}>
    <th className={ClassNames.SERVICE_LIST_NAME_LABEL}>{ props.serviceName }</th>
    <td className={`is-hidden-touch ${ClassNames.SERVICE_LIST_TIME_LABEL}`}>
      { props.serviceTime }</td>
    <td className={`is-hidden-touch ${ClassNames.SERVICE_LIST_PRICE_LABEL}`}>
      { props.servicePrice }</td>
    <td>
      <div className="level-right">
        <ListItemButtons editPath={Paths.UPDATE_SERVICE + props.id} deleteModalId={MODAL_ID}/>
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
  const { loading, error, data } = useQuery(GET_ALL_SERVICES);
  if (loading) return <LoadingPanel subject={SERVICES}/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  return <>
    <table className={`table is-fullwidth is-hoverable ${ClassNames.SERVICE_LIST}`}>
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
            <ServiceListRow key={`ag-service-id-${service.id}`} id={service.id} serviceName={service.name}
                            serviceTime={ getTimeString(service.duration * 60 * 1000, false) }
                            servicePrice={`$ ${service.price}`}
            />
        )
      }
      </tbody>
    </table>
    <DeleteModal id={MODAL_ID}>
      ¿Desea eliminar este servicio?
    </DeleteModal>
  </>
};
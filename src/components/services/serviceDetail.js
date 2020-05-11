import React from 'react';
import { Redirect } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import * as Paths from '../../constants/paths';
import { DangerHelper } from "../commons/forms/helperElement";
import ErrorPanel from '../commons/errorPanel';
import listGraphQlErrors from '../commons/listGraphQLErrors'
import FeatherInput from '../commons/forms/featherInput';
import { GET_SERVICE } from "../../data/queries/serviceQueries";
import Detail from '../commons/detail';
import FormControl from '../commons/forms/formControl';
import { getTimeString } from "../../utilities/times";
import LoadingPanel from "../commons/alerts/loadingPanel";

const Ids = {
  NAME_FIELD: "ag-service-detail-name-field",
  DESCRIPTION_FIELD: "ag-service-detail-description-field",
  DURATION_FIELD: "ag-service-detail-duration-field",
  PRICE_FIELD: "ag-service-detail-price-field",
  NAME_FIELD_HELPER: "ag-service-detail-name-helper",
  DESCRIPTION_FIELD_HELPER: "ag-service-detail-description-helper",
  DURATION_FIELD_HELPER: "ag-service-detail-duration-helper",
  PRICE_FIELD_HELPER: "ag-service-detail-price-helper",
  ADD_SERVICE_CONFIRMATION_MESSAGE: "ag-service-detail-add-service-message",
  UPDATE_SERVICE_CONFIRMATION_MESSAGE: "ag-service-detail-edit-service-message"
};

/**
 * Common service detail body.
 * @param props.description Description of the service.
 * @param props.duration Required time of the service, in minutes.
 * @param props.name Name of the service.
 * @parma props.price Cost of the service.
 * @return {*}
 * @constructor
 */
const DetailBody = function (props) {
  const nameHelper = <DangerHelper id={Ids.NAME_FIELD_HELPER}>
    Introduzca el nombre del servicio.</DangerHelper>;
  const descriptionHelper = <DangerHelper id={Ids.DESCRIPTION_FIELD_HELPER}>
    Introduzca la descripción del servicio.</DangerHelper>;
  const durationHelper = <DangerHelper id={Ids.DURATION_FIELD_HELPER}>
    Introduzca la duración del servicio.</DangerHelper>;
  const priceHelper = <DangerHelper id={Ids.PRICE_FIELD_HELPER}>
    Introduzca el precio del servicio.</DangerHelper>;

  return <>
    <FeatherInput id={Ids.NAME_FIELD} name="name" caption="Servicio" iconName="shopping-bag"
                  placeholder="Título del servicio" defaultValue={props.name}
                  helperElement={nameHelper}/>
    <FormControl id={Ids.DESCRIPTION_FIELD} name="description" caption="Descripción" inputElement={
      <textarea className="textarea" rows="3" placeholder="Descripción del servicio" defaultValue={props.description} />
    } helperElement={descriptionHelper}/>
    <div className="columns">
      <div className="column">
        <FeatherInput id={Ids.DURATION_FIELD} type="time" caption="Duración" iconName="clock"
                      defaultValue={props.duration} helperElement={durationHelper}/>
      </div>
      <div className="column">
        <FeatherInput type="number" caption="Costo" iconName="tag"
                      placeholder="Costo del servicio" defaultValue={props.price} helperElement={priceHelper} />
      </div>
    </div>
  </>;
};

/**
 * Detail form for creating and editing services.
 *
 * @param props
 * @return {*}
 * @constructor
 */
export function AddServiceDetail(props) {
  return <Detail title={"Nuevo servicio"} cancelPath={Paths.LIST_SERVICES}>
    <DetailBody {...props}/>
  </Detail>
}

export function EditServiceDetail(props) {
  const { loading, error, data } = useQuery(GET_SERVICE, { variables: {
    id: props.match.params.id
  }});
  if (loading) return <LoadingPanel subject="Servicios"/>;
  if (error) return <ErrorPanel>{listGraphQlErrors(error)}</ErrorPanel>;
  if (data === undefined) return <Redirect to={Paths.LIST_SERVICES}/>;

  const { name, description, duration, price } = data.getService;
  return <Detail cancelPath={Paths.LIST_SERVICES} title={"Editar servicio"} okCaption={"Editar"}>
    <DetailBody name={name} description={description}  price={price}
                duration={getTimeString(duration * 60 * 1000)}/>
  </Detail>;
}
import React from 'react';
import { Redirect } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import * as Paths from '../../constants/paths';
import ErrorPanel from '../commons/errorPanel';
import listGraphQlErrors from '../commons/listGraphQLErrors'
import FeatherInput from '../commons/forms/featherInput';
import { GET_SERVICE } from "../../data/queries/serviceQueries";
import Detail from '../commons/detail';
import FormControl from '../commons/forms/formControl';
import { getTimeString } from "../../utilities/times";
import LoadingPanel from "../commons/alerts/loadingPanel";

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
  return <>
    <FeatherInput caption="Servicio" iconName="shopping-bag" placeholder="Título del servicio" defaultValue={props.name}/>
    <FormControl caption="Descripción" inputElement={
      <textarea className="textarea" rows="3" placeholder="Descripción del servicio" defaultValue={props.description} />
    }/>
    <div className="columns">
      <div className="column">
        <FeatherInput type="time" caption="Duración" iconName="clock" defaultValue={props.duration}/>
      </div>
      <div className="column">
        <FeatherInput type="number" caption="Costo" iconName="tag"
                      placeholder="Costo del servicio" defaultValue={props.price}/>
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
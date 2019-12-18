import React from 'react';
import { Redirect } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import * as Paths from '../../constants/paths';
import ErrorPanel from '../commons/errorPanel';
import listGraphQlErrors from '../commons/listGraphQLErrors'
import FeatherInput from '../commons/forms/featherInput';
import { GET_SERVICE } from "../../data/queries/serviceQueries";
import getDetail from '../commons/getDetail';
import getFormControl from '../commons/forms/getFormControl';
import { getTimeString } from "../../utilities/times";
import LoadingPanel from "../commons/loadingPanel";

const detailBody = function (props) {
  const DescriptionTextArea = getFormControl(() =>
      <textarea className="textarea" rows="3" placeholder="Descripción del servicio" defaultValue={props.description} />
  );
  return <div>
    <FeatherInput caption="Servicio" iconName="shopping-bag" placeholder="Título del servicio" value={props.name}/>
    <DescriptionTextArea caption="Descripción" />
    <div className="columns">
      <FeatherInput className="column" type="time" caption="Duración" iconName="clock" value={props.duration}/>
      <FeatherInput className="column" type="number" caption="Costo" iconName="tag"
                    placeholder="Costo del servicio" value={props.price}/>
    </div>
  </div>;
};

/**
 * Detail form for creating and editing services.
 *
 * @param props
 * @return {*}
 * @constructor
 */
export function AddServiceDetail(props) {
  const Services = getDetail(detailBody);
  return <Services {...props} cancelPath={Paths.LIST_SERVICES} title={"Nuevo servicio"}/>;
}

export function EditServiceDetail(props) {
  const { loading, error, data } = useQuery(GET_SERVICE, { variables: {
    id: props.match.params.id
  }});
  if (loading) return <LoadingPanel subject="Servicios"/>;
  if (error) return <ErrorPanel>{listGraphQlErrors(error)}</ErrorPanel>;
  if (data === undefined) return <Redirect to={Paths.LIST_SERVICES}/>;

  const { name, description, duration, price } = data.getService;
  const ServiceDetail = getDetail(detailBody);
  return <ServiceDetail name={name} description={description} duration={getTimeString(duration * 60 * 1000)} price={price}
                        {...props} cancelPath={Paths.LIST_SERVICES} title={"Editar servicio"} okCaption={"Editar"}/>;
}
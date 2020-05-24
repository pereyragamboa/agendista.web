import React from 'react';
import { Redirect } from 'react-router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import * as Paths from '../../constants/paths';
import LoadingPanel from "../commons/alerts/loadingPanel";
import Detail from '../commons/detail';
import ErrorPanel from '../commons/errorPanel';
import FeatherInput from '../commons/forms/featherInput';
import FormControl from '../commons/forms/formControl';
import { DangerHelper } from "../commons/forms/helperElement";
import listGraphQlErrors from '../commons/listGraphQLErrors'
import { ADD_SERVICE, GET_SERVICE, UPDATE_SERVICE } from "../../data/queries/serviceQueries";
import { update } from "../../data/resolvers/serviceResolvers";
import { getMilliseconds, getTimeString } from "../../utilities/times";
import { requiredString } from "../yupSchemas";

export const Ids = {
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

const MILLISECONDS_PER_MINUTE = 60 * 1000;

/**
 * Common service detail body.
 * @param props.description Description of the service.
 * @param props.duration Required time of the service, in minutes.
 * @param props.name Name of the service.
 * @parma props.price Cost of the service.
 * @return {*}
 * @constructor
 */
const DetailBody = function ({formik, ...props}) {
  const { touched, errors } = formik;
  const nameHelper = touched.name && errors.name ?
      <DangerHelper id={Ids.NAME_FIELD_HELPER}>{formik.errors.name}</DangerHelper> : null;
  const descriptionHelper = touched.description && errors.description ?
      <DangerHelper id={Ids.DESCRIPTION_FIELD_HELPER}>
        {formik.errors.description}</DangerHelper> : null;
  const durationHelper = touched.duration && errors.duration ?
      <DangerHelper id={Ids.DURATION_FIELD_HELPER}>
        {formik.errors.duration}</DangerHelper> : null;
  const priceHelper = touched.price && errors.price ?
      <DangerHelper id={Ids.PRICE_FIELD_HELPER}>{formik.errors.price}</DangerHelper> : null;

  return <>
    <FeatherInput id={Ids.NAME_FIELD} name="name" caption="Servicio" iconName="shopping-bag"
                  placeholder="Título del servicio" defaultValue={props.name}
                  helperElement={nameHelper} {...formik.getFieldProps("name")}/>
    <FormControl id={Ids.DESCRIPTION_FIELD} caption="Descripción" inputElement={
      <textarea className="textarea" name="description" rows="3" placeholder="Descripción del servicio"
                defaultValue={props.description} {...formik.getFieldProps("description")} />
    } helperElement={descriptionHelper} />
    <div className="columns">
      <div className="column">
        <FeatherInput id={Ids.DURATION_FIELD} name="duration" type="time" caption="Duración"
                      iconName="clock" defaultValue={props.duration} helperElement={durationHelper}
                      {...formik.getFieldProps("duration")}/>
      </div>
      <div className="column">
        <FeatherInput id={Ids.PRICE_FIELD} type="number" caption="Costo" iconName="tag"
                      placeholder="Costo del servicio" defaultValue={props.price} helperElement={priceHelper}
                      {...formik.getFieldProps("price")} />
      </div>
    </div>
  </>;
};

const validationSchema = Yup.object().shape({
  name: requiredString("Agregue el nombre del servicio."),
  description: requiredString("Agregue la descripción del servicio."),
  duration: requiredString("Agregue la duración del servicio.")
    .matches(/[0-1]?\d:[0-5]\d/gm, "Agregue una duración en formato hh:mm."),
  price: Yup.number("El precio debe ser un número.")
    .required("Agregue el precio del servicio.")
    .positive("Agregue un precio mayor a cero.")
});

/**
 * Detail form for adding new services.
 *
 * @param props
 * @return {*}
 * @constructor
 */
export function AddServiceDetail(props) {
  const [ addService, status ] = useMutation(ADD_SERVICE, { update });
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      duration: "00:00",
      price: 0
    },
    onSubmit: (values, f) => {
      const { duration, ...otherValues } = values;
      addService({ variables: {
        duration: getMilliseconds(duration) / MILLISECONDS_PER_MINUTE,
        ...otherValues
      }});
      f.setStatus(status);
    },
    validationSchema
  });
  const enableOkButton = formik.dirty && formik.isValid && !formik.isSubmitting;
  return <Detail title={"Nuevo servicio"} cancelPath={Paths.LIST_SERVICES}
                 enableOkButton={enableOkButton} onSubmit={formik.handleSubmit}>
    <DetailBody formik={formik} {...props}/>
  </Detail>
}

/**
 * Detail form for editing and updating existing services.
 *
 * @param props
 * @return {*}
 * @constructor
 */
export function EditServiceDetail(props) {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_SERVICE, { variables: { id }});
  const [ updateService, mutationStatus ] = useMutation(UPDATE_SERVICE);
  if (loading) return <LoadingPanel subject="Servicios"/>;
  if (error) return <ErrorPanel>{listGraphQlErrors(error)}</ErrorPanel>;
  if (data === undefined) return <Redirect to={Paths.LIST_SERVICES}/>;

  const { name, description, duration, price } = data.getService;
  const durationString = getTimeString(duration * MILLISECONDS_PER_MINUTE);
  return <Formik initialValues={{ name, description, price, duration: durationString }}
            initialStatus={mutationStatus}
            validationSchema={validationSchema}
            onSubmit={values => {
              const { duration, ...otherValues } = values;
              updateService({
                variables: {
                  id,
                  duration: getMilliseconds(duration) / MILLISECONDS_PER_MINUTE,
                  ...otherValues }
              });
            }}>
    { formik => {
      console.log(formik);
      const enableOkButton = formik.dirty && formik.isValid && !formik.isSubmitting;
      return <Detail cancelPath={Paths.LIST_SERVICES} title={"Editar servicio"}
                     enableOkButton={enableOkButton} onSubmit={formik.handleSubmit} okCaption={"Editar"}>
          <DetailBody formik={formik}/>
        </Detail>
    }}
    </Formik>;
}
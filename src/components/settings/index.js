import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorPanel from '../commons/errorPanel';
import FeatherInput from '../commons/forms/featherInput';
import { GET_SETTINGS } from '../../data/queries/settingsQueries';
import Detail from '../commons/detail';
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import * as Paths from '../../constants/paths';
import * as Placeholders from '../../constants/placeholders';
import { SETTINGS } from "../../constants/headers";

const emailPlaceholder = Placeholders.getEmailPlaceholder();
const phonePlaceholder = Placeholders.getTelephonePlaceholder();
const webPlaceholder = Placeholders.getWebsitePlaceholder();

export const FieldIds = {
  BUSINESS_FIELD: "ag_settings_business_field",
  WEBSITE_FIELD: "ag_settings_website_field",
  EMAIL_FIELD: "ag_settings_email_field",
  PHONE_FIELD: "ag_settings_phone_field",
  BUSINESS_FIELD_HELPER: "ag_settings_business_field_helper",
  WEBSITE_FIELD_HELPER: "ag_settings_website_field_helper",
  EMAIL_FIELD_HELPER: "ag_settings_email_field_helper",
  PHONE_FIELD_HELPER: "ag_settings_phone_field_helper"
};

const Settings = ({touched, errors, ...formik}) =>
    <Detail title={SETTINGS} featherIcon="settings" okCaption="Aceptar" cancelPath={Paths.HOME}
            enableOkButton={formik.dirty && formik.isValid} onClick={formik.handleSubmit}>
      <FeatherInput id={FieldIds.BUSINESS_FIELD} caption="Nombre" iconName="briefcase"
                    placeholder="Nombre comercial del negocio u organización"
                    {...formik.getFieldProps('businessName')}
                    helperElement={(touched.businessName && errors.businessName) ?
                        <p id={FieldIds.BUSINESS_FIELD_HELPER} className="has-text-danger">
                          {errors.businessName}</p> : null}/>
      <FeatherInput id={FieldIds.WEBSITE_FIELD} caption="Sitio web" iconName="globe"
                    placeholder={webPlaceholder} {...formik.getFieldProps('url')}
                    helperElement={(touched.url && errors.url) ?
                        <p id={FieldIds.WEBSITE_FIELD_HELPER} className="has-text-danger">
                          {errors.url}</p> : null}/>
      <div className="columns">
        <div className="column">
          <FeatherInput id={FieldIds.PHONE_FIELD} caption="Teléfono" iconName="phone"
                        placeholder={phonePlaceholder} {...formik.getFieldProps('telephone')}
                        helperElement={(touched.telephone && errors.telephone) ?
                            <p id={FieldIds.PHONE_FIELD_HELPER} className="has-text-danger">
                              {errors.telephone}</p> : null}/>
        </div>
        <div className="column">
          <FeatherInput id={FieldIds.EMAIL_FIELD} caption="Correo electrónico" iconName="at-sign"
                        placeholder={emailPlaceholder} {...formik.getFieldProps('email')}
                        helperElement={(touched.email && errors.email) ?
                            <p id={FieldIds.EMAIL_FIELD_HELPER} className="has-text-danger">{errors.email}</p> : null}/>
        </div>
      </div>
    </Detail>;

/**
 * Main settings page.
 * @return {*}
 * @constructor
 */
export default function () {
  const { loading, error, data } = useQuery(GET_SETTINGS);
  if (loading) return <LoadingPanel subject={SETTINGS}/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;

  return <Formik initialValues={data.getProfile}
                 validationSchema={Yup.object().shape({
                   businessName: Yup.string().required('Agregue el nombre de su negocio.'),
                   email: Yup.string().required('Agregue un correo electrónico.').email(),
                   telephone: Yup.string().required('Agregue un número de teléfono'),
                   url: Yup.string().url("Agregue una dirección Web válida.") })}
                 onSubmit = { values => console.log(values) } component={Settings}>
  </Formik>;
}
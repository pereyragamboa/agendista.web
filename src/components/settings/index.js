import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Detail from '../commons/detail';
import ErrorPanel from '../commons/errorPanel';
import FeatherInput from '../commons/forms/featherInput';
import { GET_SETTINGS, UPDATE_SETTINGS } from '../../data/queries/settingsQueries';
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/alerts/loadingPanel';
import Notification from '../commons/alerts/notification';
import SavingPanel from '../commons/alerts/savingPanel';
import * as Paths from '../../constants/paths';
import * as Placeholders from '../../constants/placeholders';
import { SETTINGS } from "../../constants/headers";

const emailPlaceholder = Placeholders.getEmailPlaceholder();
const phonePlaceholder = Placeholders.getTelephonePlaceholder();
const webPlaceholder = Placeholders.getWebsitePlaceholder();

export const Ids = {
  BUSINESS_FIELD: "ag_settings_business_field",
  WEBSITE_FIELD: "ag_settings_website_field",
  EMAIL_FIELD: "ag_settings_email_field",
  PHONE_FIELD: "ag_settings_phone_field",
  BUSINESS_FIELD_HELPER: "ag_settings_business_field_helper",
  WEBSITE_FIELD_HELPER: "ag_settings_website_field_helper",
  EMAIL_FIELD_HELPER: "ag_settings_email_field_helper",
  PHONE_FIELD_HELPER: "ag_settings_phone_field_helper",
  CONFIRMATION_MESSAGE: "ag_settings_profile_changed_message"
};

const Settings = ({errors, status, touched, ...formik}) => {
  const enableOkButton = formik.dirty && formik.isValid && !formik.isSubmitting;

  return <Detail title={SETTINGS} featherIcon="settings" okCaption="Aceptar" cancelPath={Paths.HOME}
          enableOkButton={enableOkButton} onSubmit={formik.handleSubmit}>

    { status.loading && <SavingPanel caption="perfil"/> }
    { /* formik.resetForm also resets formik.status and formik.status.notify */ }
    <Notification id={Ids.CONFIRMATION_MESSAGE}
                  show={status.notify}
                  onClick={() => formik.resetForm({values: formik.values})}>
      <p>Ha actualizado su perfil.</p>
    </Notification>
    <FeatherInput id={Ids.BUSINESS_FIELD} caption="Nombre" iconName="briefcase"
                  placeholder="Nombre comercial del negocio u organización"
                  {...formik.getFieldProps('businessName')}
                  helperElement={(touched.businessName && errors.businessName) ?
                      <p id={Ids.BUSINESS_FIELD_HELPER} className="has-text-danger">
                        {errors.businessName}</p> : null}/>
    <FeatherInput id={Ids.WEBSITE_FIELD} caption="Sitio web" iconName="globe"
                  placeholder={webPlaceholder} {...formik.getFieldProps('url')}
                  helperElement={(touched.url && errors.url) ?
                      <p id={Ids.WEBSITE_FIELD_HELPER} className="has-text-danger">
                        {errors.url}</p> : null}/>
    <div className="columns">
      <div className="column">
        <FeatherInput id={Ids.PHONE_FIELD} caption="Teléfono" iconName="phone"
                      placeholder={phonePlaceholder} {...formik.getFieldProps('telephone')}
                      helperElement={(touched.telephone && errors.telephone) ?
                          <p id={Ids.PHONE_FIELD_HELPER} className="has-text-danger">
                            {errors.telephone}</p> : null}/>
      </div>
      <div className="column">
        <FeatherInput id={Ids.EMAIL_FIELD} caption="Correo electrónico" iconName="at-sign"
                      placeholder={emailPlaceholder} {...formik.getFieldProps('email')}
                      helperElement={(touched.email && errors.email) ?
                          <p id={Ids.EMAIL_FIELD_HELPER} className="has-text-danger">{errors.email}</p> : null}/>
      </div>
    </div>

  </Detail>;
};

/**
 * Main settings page.
 * @return {*}
 * @constructor
 */
export default function () {
  const { loading, error, data } = useQuery(GET_SETTINGS);
  const [ updateProfile, mutationStatus ] = useMutation(UPDATE_SETTINGS);

  if (loading) return <LoadingPanel subject={SETTINGS}/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;

  return <Formik initialValues={data.getProfile}
                 // notify indicates if the mutation was sent; is used for showing the notification
                 initialStatus={{...mutationStatus, notify: false}}
                 validationSchema={Yup.object().shape({
                   businessName: Yup.string().required('Agregue el nombre de su negocio.'),
                   email: Yup.string().required('Agregue un correo electrónico.').email(),
                   telephone: Yup.string().required('Agregue un número de teléfono'),
                   url: Yup.string().url("Agregue una dirección Web válida.") })}
                 onSubmit = { (values, formik) => {
                   updateProfile({
                     variables: values,
                   });
                   formik.setStatus({...mutationStatus, notify: true});
                 }}>{Settings}
  </Formik>;
}
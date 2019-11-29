import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ErrorPanel from '../commons/errorPanel';
import FeatherInput from '../commons/forms/featherInput';
import getDetail from '../commons/getDetail';
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import * as Paths from '../../constants/paths';
import * as Placeholders from '../../constants/placeholders';
import { SETTINGS } from "../../constants/headers";

const emailPlaceholder = Placeholders.getEmailPlaceholder();
const phonePlaceholder = Placeholders.getTelephonePlaceholder();
const webPlaceholder = Placeholders.getWebsitePlaceholder();

/**
 * Main settings page.
 * @return {*}
 * @constructor
 */
export default function Settings() {
  const { loading, error, data } = useQuery(gql`
    query { getProfile(profileId: "0x30001") {
        businessName
        email
        telephone
        url
    }}
  `);
  if (loading) return <LoadingPanel subject={SETTINGS}/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;

  const settingsBody = () => <div>
    <FeatherInput caption="Nombre" iconName="briefcase"
                  value={data.getProfile.businessName}
                  placeholder="Nombre comercial del negocio u organización"/>
    <FeatherInput caption="Sitio web" iconName="globe"
                  value={data.getProfile.url} placeholder={webPlaceholder}/>
    <div className="columns">
      <div className="column">
        <FeatherInput caption="Teléfono" iconName="phone"
                      value={data.getProfile.telephone} placeholder={phonePlaceholder}/>
      </div>
      <div className="column">
        <FeatherInput caption="Correo electrónico" iconName="at-sign"
                      value={data.getProfile.email} placeholder={emailPlaceholder}/>
      </div>
    </div>

  </div>;

  const SettingsDetail = getDetail(settingsBody);

  return <SettingsDetail title={SETTINGS} featherIcon="settings" okCaption="Aceptar" cancelPath={Paths.HOME}/>;
}
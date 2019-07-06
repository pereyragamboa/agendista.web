import React from 'react';
import FeatherInput from '../commons/forms/featherInput';
import getDetail from '../commons/getDetail';
import { SETTINGS } from "../../constants/headers";
import * as Paths from '../../constants/paths';
import * as Placeholders from '../../constants/placeholders';

const emailPlaceholder = Placeholders.getEmailPlaceholder();
const phonePlaceholder = Placeholders.getTelephonePlaceholder();
const webPlaceholder = Placeholders.getWebsitePlaceholder();

export default function Settings() {
  const settingsBody = () => <div>
    <FeatherInput caption="Nombre" iconName="briefcase" placeholder="Nombre comercial del negocio u organización"/>
    <FeatherInput caption="Sitio web" iconName="globe" placeholder={webPlaceholder}/>
    <div className="columns">
      <div className="column">
        <FeatherInput caption="Teléfono" iconName="phone" placeholder={phonePlaceholder}/>
      </div>
      <div className="column">
        <FeatherInput caption="Correo electrónico" iconName="at-sign" placeholder={emailPlaceholder}/>
      </div>
    </div>

  </div>;

  const SettingsDetail = getDetail(settingsBody);

  return <SettingsDetail title={SETTINGS} featherIcon="settings" okCaption="Aceptar" cancelPath={Paths.HOME}/>;
}
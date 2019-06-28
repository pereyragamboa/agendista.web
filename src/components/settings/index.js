import React from 'react';
import FeatherInput from '../commons/forms/featherInput';
import getDetail from '../commons/getDetail';
import * as Paths from '../../constants/paths';

export default function Settings() {
  const settingsBody = () => <div>
    <FeatherInput caption="Nombre" iconName="dollar-sign" placeholder="Nombre comercial del negocio u organización"/>
    <FeatherInput caption="Sitio web" iconName="globe" placeholder="https://ejemplo.com"/>
    <div className="columns">
      <div className="column">
        <FeatherInput caption="Teléfono" iconName="phone" placeholder="Número de teléfono"/>
      </div>
      <div className="column">
        <FeatherInput caption="Correo electrónico" iconName="at-sign" placeholder="cliente@ejemplo.com"/>
      </div>
    </div>

  </div>;

  const SettingsDetail = getDetail(settingsBody);

  return <SettingsDetail title="Opciones" cancelPath={Paths.HOME}/>;
}
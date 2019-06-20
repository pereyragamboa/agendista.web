import React from 'react';
import getDetail from '../commons/getDetail';
import * as Paths from '../../paths';
import FeatherIcon from "../commons/featherIcon";
import FeatherInput from '../commons/featherInput';

const detailBody = () =>
    <div>
      <FeatherInput caption="Nombres" iconName="user" placeholder="Nombres propios"/>
      <FeatherInput caption="Apellidos" iconName="users" placeholder="Apellidos" />
      <div className="columns">
        <div className="column">
          <FeatherInput caption="Teléfono" iconName="phone" placeholder="Número de teléfono"/>
        </div>
        <div className="column">
          <FeatherInput caption="Correo electrónico" iconName="at-sign" placeholder="cliente@ejemplo.com"/>
        </div>
      </div>
    </div>;

export default function CustomerDetail() {
  const CustomerDetail = getDetail(detailBody);

  return <CustomerDetail title="Nuevo cliente" cancelPath={Paths.LIST_CUSTOMERS}/>;
}
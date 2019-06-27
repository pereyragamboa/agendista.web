import React from 'react';
import getDetail from '../commons/getDetail';
import * as Paths from '../../paths';
import FeatherInput from '../commons/forms/featherInput';

const detailBody = () =>
    <div>
      <FeatherInput caption="Nombres" iconName="user" placeholder="Nombres propios"/>
      <FeatherInput caption="Apellidos" iconName="users" placeholder="Apellidos" />
      <div className="columns">
        <div className="column">
          <FeatherInput caption="Teléfono" iconName="phone" placeholder="123 456 7890"/>
        </div>
        <div className="column">
          <FeatherInput caption="Correo electrónico" iconName="at-sign" placeholder="cliente@ejemplo.com"/>
        </div>
      </div>
    </div>;

export default function CustomerDetail(props) {
  const CustomerDetail = getDetail(detailBody);

  return <CustomerDetail {...props} cancelPath={Paths.LIST_CUSTOMERS}/>;
}
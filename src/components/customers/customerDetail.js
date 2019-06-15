import React from 'react';
import getDetail from '../commons/getDetail';
import * as Paths from '../../paths';
import FeatherIcon from "../commons/featherIcon";

const detailBody = () =>
    <div>
      <div className="field">
        <label className="label">Nombres</label>
        <div className="control has-icons-left">
          <input className="input" type="text" placeholder="Nombres y patronímicos"/>
          <FeatherIcon className="icon is-left" iconName="user"/>
        </div>
      </div>
      <div className="field">
        <label className="label">Apellidos</label>
        <div className="control has-icons-left">
          <input className="input" type="text" placeholder="Apellidos"/>
          <FeatherIcon className="icon is-left" iconName="users"/>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Teléfono</label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Teléfono"/>
              <FeatherIcon className="icon is-left" iconName="phone"/>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Correo electrónico</label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="ej. cliente@correo.com"/>
              <FeatherIcon className="icon is-left" iconName="at-sign"/>
            </div>
          </div>
        </div>
      </div>
    </div>;

export default function CustomerDetail() {
  const CustomerDetail = getDetail(detailBody);

  return <CustomerDetail title="Nuevo cliente" cancelPath={Paths.LIST_CUSTOMERS}/>;
}
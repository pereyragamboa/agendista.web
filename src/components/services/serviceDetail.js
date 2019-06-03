import React from 'react';
import * as Paths from '../../paths';
import FeatherIcon from '../commons/featherIcon';
import getDetail from '../commons/getDetail';

export default function ServiceDetail() {
  const detailBody = () =>
    <div>
      <div className="field">
        <label className="label">Servicio</label>
        <div className="control has-icons-left">
          <input className="input" type="text" placeholder="Título del servicio"/>
          <span className="icon is-left"><FeatherIcon iconName="shopping-bag"/></span>
        </div>
      </div>
      <div className="field">
        <label className="label">Descripción</label>
        <div className="control">
          <textarea className="textarea" rows="3" placeholder="Descripción del servicio"/>
        </div>
      </div>
      <div className="field">
        <label className="label">Duración</label>
        <div className="control has-icons-left">
          <input className="input" type="time"/>
          <span className="icon is-left"><FeatherIcon iconName="clock"/></span>
        </div>
      </div>
      <div className="field">
        <label className="label">Costo</label>
        <div className="control has-icons-left">
          <input className="input" type="number" placeholder="Costo del servicio"/>
          <span className="icon is-left"><FeatherIcon iconName="tag"/></span>
        </div>
      </div>
    </div>;

  const Services = getDetail(detailBody);

  return <Services cancelPath={Paths.LIST_SERVICES}
                   title="Nuevo servicio"/>;
};
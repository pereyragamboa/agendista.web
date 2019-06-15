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
          <FeatherIcon className="icon is-left" iconName="shopping-bag"/>
        </div>
      </div>
      <div className="field">
        <label className="label">Descripción</label>
        <div className="control">
          <textarea className="textarea" rows="3" placeholder="Descripción del servicio"/>
        </div>
      </div>
      <div className="columns">
        <div className="field column">
          <label className="label">Duración</label>
          <div className="control has-icons-left">
            <input className="input" type="time"/>
            <FeatherIcon  className="icon is-left"iconName="clock"/>
          </div>
        </div>
        <div className="field column">
          <label className="label">Costo</label>
          <div className="control has-icons-left">
            <input className="input" type="number" placeholder="Costo del servicio"/>
            <FeatherIcon className="icon is-left" iconName="tag"/>
          </div>
        </div>
      </div>
    </div>;

  const Services = getDetail(detailBody);

  return <Services cancelPath={Paths.LIST_SERVICES}
                   title="Nuevo servicio"/>;
};
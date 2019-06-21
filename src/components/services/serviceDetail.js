import React from 'react';
import * as Paths from '../../paths';
import FeatherInput from '../commons/featherInput';
import getDetail from '../commons/getDetail';

export default function ServiceDetail() {
  const detailBody = () =>
    <div>
      <FeatherInput caption="Servicio"  iconName="shopping-bag" placeholder="Título del servicio"/>
      <FeatherInput caption="Servicio"  iconName="shopping-bag" placeholder="Título del servicio"/>
      <div className="field">
        <label className="label">Descripción</label>
        <div className="control">
          <textarea className="textarea" rows="3" placeholder="Descripción del servicio"/>
        </div>
      </div>
      <div className="columns">
        <FeatherInput className="column" type="time" caption="Duración" iconName="clock" />
        <FeatherInput className="column" type="number"
                      caption="Costo" iconName="tag"
                      placeholder="Costo del servicio"/>
      </div>
    </div>;

  const Services = getDetail(detailBody);

  return <Services cancelPath={Paths.LIST_SERVICES}
                   title="Nuevo servicio"/>;
};
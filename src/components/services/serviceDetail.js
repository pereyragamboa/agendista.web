import React from 'react';
import * as Paths from '../../paths';
import FeatherInput from '../commons/forms/featherInput';
import getDetail from '../commons/getDetail';
import getFormControl from '../commons/forms/getFormControl';

const DescriptionField = getFormControl(
    <textarea className="textarea" rows="3" placeholder="Descripción del servicio"/>
);

export default function ServiceDetail() {
  const detailBody = () =>
    <div>
      <FeatherInput caption="Servicio"  iconName="shopping-bag" placeholder="Título del servicio"/>
      <DescriptionField caption="Descripción"/>
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
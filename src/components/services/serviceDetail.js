import React from 'react';
import * as Paths from '../../constants/paths';
import FeatherInput from '../commons/forms/featherInput';
import getDetail from '../commons/getDetail';
import getFormControl from '../commons/forms/getFormControl';

const DescriptionTextArea = getFormControl(
    <textarea className="textarea" rows="3" placeholder="Descripción del servicio"/>
);

export default function ServiceDetail(props) {
  const detailBody = () =>
    <div>
      <FeatherInput caption="Servicio"  iconName="shopping-bag" placeholder="Título del servicio"/>
      <DescriptionTextArea caption="Descripción"/>
      <div className="columns">
        <FeatherInput className="column" type="time" caption="Duración" iconName="clock" />
        <FeatherInput className="column" type="number"
                      caption="Costo" iconName="tag"
                      placeholder="Costo del servicio"/>
      </div>
    </div>;

  const Services = getDetail(detailBody);

  return <Services {...props} cancelPath={Paths.LIST_SERVICES}/>;
};
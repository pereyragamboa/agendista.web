import React from 'react';
import * as Paths from '../../constants/paths';
import * as Placeholders from '../../constants/placeholders';
import FeatherInput from '../commons/forms/featherInput';
import getDetail from '../commons/getDetail';

const emailPlaceholder = Placeholders.getEmailPlaceholder();
const phonePlaceholder = Placeholders.getTelephonePlaceholder();

const detailBody = () =>
    <div>
      <FeatherInput caption="Nombres" iconName="user" placeholder="Nombres propios"/>
      <FeatherInput caption="Apellidos" iconName="users" placeholder="Apellidos" />
      <div className="columns">
        <div className="column">
          <FeatherInput caption="Teléfono" iconName="phone" placeholder={phonePlaceholder}/>
        </div>
        <div className="column">
          <FeatherInput caption="Correo electrónico" iconName="at-sign" placeholder={emailPlaceholder}/>
        </div>
      </div>
    </div>;

/**
 * Detail form for creating and editing customers.
 *
 * @param props
 * @return {*}
 * @constructor
 */
export default function CustomerDetail(props) {
  const CustomerDetail = getDetail(detailBody);

  return <CustomerDetail {...props} cancelPath={Paths.LIST_CUSTOMERS}/>;
}
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import * as Paths from '../../constants/paths';
import * as Placeholders from '../../constants/placeholders';
import FeatherInput from '../commons/forms/featherInput';
import getDetail from '../commons/getDetail';
import LoadingPanel from "../commons/loadingPanel";

const emailPlaceholder = Placeholders.getEmailPlaceholder();
const phonePlaceholder = Placeholders.getTelephonePlaceholder();

function detailBody(props) {
  return <div>
    <FeatherInput caption="Nombres" iconName="user" placeholder="Nombres propios" value={props.firstName}/>
    <FeatherInput caption="Apellidos" iconName="users" placeholder="Apellidos" value={props.lastName}/>
    <div className="columns">
      <div className="column">
        <FeatherInput caption="Teléfono" iconName="phone" placeholder={phonePlaceholder} value={props.telephone}/>
      </div>
      <div className="column">
        <FeatherInput caption="Correo electrónico" iconName="at-sign" placeholder={emailPlaceholder} value={props.email}/>
      </div>
    </div>
  </div>;
}

export function AddCustomerDetail(props) {
  const CustomerDetail = getDetail(detailBody);
  return <CustomerDetail {...props} cancelPath={Paths.LIST_CUSTOMERS}/>;

}

/**
 * Detail form for creating and editing customers.
 *
 * @param props
 * @return {*}
 * @constructor
 */
export function EditCustomerDetail(props) {
  const CustomerDetail = getDetail(detailBody);

  const { loading, error, data } = useQuery(gql`
      query getCustomerInfo($customerId: ID!) {
          getCustomer(clientId: $customerId) {
              firstName
              lastName
              telephone
              email
          }}`,
      { variables: { customerId: props.match.params.id }});
  if (loading) return <LoadingPanel subject={"datos del cliente"}/>;
  if (error) return <p>Error: {error.toString()}</p>;

  const { firstName, lastName, telephone, email } = data.getCustomer;

  return <CustomerDetail {...props}
                         firstName={firstName} lastName={lastName}
                         telephone={telephone} email={email}
                         cancelPath={Paths.LIST_CUSTOMERS}/>;
}
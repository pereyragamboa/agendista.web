import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router';
import * as IDs from '../../constants/ids';
import * as Paths from '../../constants/paths';
import * as Placeholders from '../../constants/placeholders';
import ErrorPanel from '../commons/errorPanel';
import FeatherInput from '../commons/forms/featherInput';
import {GET_ALL_CUSTOMERS, GET_CUSTOMER} from "../../data/queries/customerQueries";
import getDetail, { enableOkButton } from '../commons/getDetail';
import LoadingPanel from "../commons/alerts/loadingPanel";

const emailPlaceholder = Placeholders.getEmailPlaceholder();
const phonePlaceholder = Placeholders.getTelephonePlaceholder();

function DetailBody(props) {
  return <div>
    <FeatherInput id={IDs.CUSTOMER_FIRST_NAME_FIELD} caption="Nombres"
                  iconName="user" placeholder="Nombres propios" value={props.firstName}/>
    <FeatherInput id={IDs.CUSTOMER_LAST_NAME_FIELD} caption="Apellidos"
                  iconName="users" placeholder="Apellidos"  value={props.lastName}/>
    <div className="columns">
      <div className="column">
        <FeatherInput id={IDs.CUSTOMER_PHONE_FIELD} caption="Teléfono"
                      iconName="phone" placeholder={phonePlaceholder} value={props.telephone}/>
      </div>
      <div className="column">
        <FeatherInput id={IDs.CUSTOMER_EMAIL_FIELD} caption="Correo electrónico"
                      iconName="at-sign" placeholder={emailPlaceholder} value={props.email}/>
      </div>
    </div>
  </div>;
}

function getCustomerInformation() {
  return {
    firstName: (document.getElementById(IDs.CUSTOMER_FIRST_NAME_FIELD)).value,
    lastName: (document.getElementById(IDs.CUSTOMER_LAST_NAME_FIELD)).value,
    telephone: (document.getElementById(IDs.CUSTOMER_PHONE_FIELD)).value,
    email: (document.getElementById(IDs.CUSTOMER_EMAIL_FIELD)).value,   
  }
}

/**
 *
 * @param props.forwardUrl URL of screen to be shown after clicking the OK button.
 * @return {*}
 * @constructor
 */
export function AddCustomerDetail(props) {
  const { forwardUrl, ...otherProps } = props;
  const [ state, setState ] = useState({
    redirect: false
  });
  const [ addCustomer ] = useMutation(gql`
    mutation addCustomer($customer: CustomerInput ){
        addCustomer(client: $customer) { id }
    }`, {
    refetchQueries: [
      { query: GET_ALL_CUSTOMERS }
    ]
  });

  function okClick() {
    addCustomer({
      variables: {
        customer: getCustomerInformation()
      }
    });
    setState({
      redirect: true
    });
  }

  useEffect(() => {
    if (!state.redirect) enableOkButton();
  });

  const CustomerDetail = getDetail(DetailBody, okClick);
  return state.redirect ? <Redirect push to={forwardUrl}/> : <CustomerDetail {...otherProps} cancelPath={Paths.LIST_CUSTOMERS}/>;

}

/**
 * Detail form for creating and editing customers.
 *
 * @param props
 * @return {*}
 * @constructor
 */
export function EditCustomerDetail(props) {
  const customerId = props.match.params.id;

  const { loading, error, data } = useQuery(
      GET_CUSTOMER,
      { variables: { customerId }});
  const [ updateCustomer ] = useMutation(gql`
    mutation updateCustomer(
    $id: ID!
    $customer: CustomerInput!) {
        updateCustomer(
            clientId: $id
            client: $customer
        ) { id }
    }`, {
    onCompleted: () => console.log("Ha actualizado los datos del cliente."),
    refetchQueries: [
      { query: GET_ALL_CUSTOMERS }
    ]
  });

  const CustomerDetail = getDetail(DetailBody, () => {
    updateCustomer({
      variables: { id: customerId, customer: getCustomerInformation() },
    });
  });
  useEffect(() => { if (data) enableOkButton() });

  if (loading) return <LoadingPanel subject={"datos del cliente"}/>;
  if (error) return <ErrorPanel errorMessage={error.message}/>;
  if (data === undefined) return <Redirect to={Paths.LIST_CUSTOMERS} />;

  const { firstName, lastName, telephone, email } = data.getCustomer;
  return <CustomerDetail {...props}
                         firstName={firstName} lastName={lastName}
                         telephone={telephone} email={email}
                         cancelPath={Paths.LIST_CUSTOMERS}/>;
}
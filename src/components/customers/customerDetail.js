import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router';
import * as IDs from '../../constants/ids';
import * as Paths from '../../constants/paths';
import * as Placeholders from '../../constants/placeholders';
import ErrorPanel from '../commons/errorPanel';
import FeatherInput from '../commons/forms/featherInput';
import { GET_CUSTOMER} from "../../data/queries/customerQueries";
import getDetail, { enableOkButton } from '../commons/getDetail';
import LoadingPanel from "../commons/loadingPanel";

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

  function okClick() {
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
  const CustomerDetail = getDetail(DetailBody);

  const { loading, error, data } = useQuery(
      GET_CUSTOMER,
      { variables: { customerId: props.match.params.id }});
  if (loading) return <LoadingPanel subject={"datos del cliente"}/>;
  if (error) return <ErrorPanel errorMessage={error.message}/>;
  if (data === undefined) return <Redirect to={Paths.LIST_CUSTOMERS} />;

  const { firstName, lastName, telephone, email } = data.getCustomer;
  return <CustomerDetail {...props}
                         firstName={firstName} lastName={lastName}
                         telephone={telephone} email={email}
                         cancelPath={Paths.LIST_CUSTOMERS}/>;
}
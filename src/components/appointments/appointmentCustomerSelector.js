import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useLazyQuery } from '@apollo/react-hooks';
import ErrorPanel from '../commons/errorPanel';
import FeatherInput from '../commons/forms/featherInput';
import getDetail, { enableOkButton } from '../commons/getDetail';
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import * as Paths from '../../constants/paths';

let selectedCustomerId = "";

/**
 * Shows the results of a customer search.
 * @param props.names Customer information, from a customer query.
 * @return {*}
 * @constructor
 */
function CustomerSelectionResults(props) {
  const IS_ROW_SELECTED_CLASS = "is-selected";

  function onCustomerRowClick(e) {
    // Because the click() event will be raised from a <td>, we must query the parent of the clicked <td>
    const newId = e.target.parentElement.id;
    // Deselect current row, if present
    if (selectedCustomerId && selectedCustomerId !== newId) {
      document.getElementById(selectedCustomerId).classList.remove(IS_ROW_SELECTED_CLASS);
    }
    // Select new row
    document.getElementById(newId).classList.add(IS_ROW_SELECTED_CLASS);
    selectedCustomerId = newId;
    // Show confirm button
    enableOkButton();
  }

  return props.names && props.names.length > 0 ?
      <div className="field">
      <table className="table is-fullwidth is-hoverable">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th className="is-hidden-mobile">Correo electrónico</th>
        </tr>
        </thead>
        <tbody style={{cursor: "pointer"}}>
        {
          props.names.map(name => <tr id={name.id} key={name.id} onClick={onCustomerRowClick}>
            <td>{name.firstName}</td>
            <td>{name.lastName}</td>
            <td className="is-hidden-mobile">{name.email}</td>
          </tr>)
        }
        </tbody>
      </table></div> :
      <div className="field message is-warning">
        <p className="message-header">No se encontraron clientes.</p>
        <p className="message-body">Intente buscar otro nombre, o <Link to={Paths.ADD_CUSTOMER}>agregar un nuevo cliente</Link>.</p>
      </div>
}

export default function AppointmentCustomerSelector() {
  const SEARCH_INPUT_ID = "ag-search-criteria-input";

  // Hooks
  const [state, setState] = useState({
    searchCriteria: "", // Content of the customer name input
    okButtonClicked: false
  });

  useEffect(() => {
    // Keeps focus on the search criteria input
    const searchInput = document.getElementById(SEARCH_INPUT_ID);
    if (searchInput) searchInput.focus();
  });

  const [getQuery, { loading, error, data }] = useLazyQuery(gql`
      query findCustomers($names: [String]) {
          findCustomersByName(names: $names) {
              id
              firstName
              lastName
              email
          }
      }`);

  let timer = null; // Timer reference

  // Event handlers
  function onCustomerChange(e) {
    if (timer != null) {
      // Resets timer
      clearTimeout(timer);
      timer = null;
    }
    const value = e.target.value.trim();
    // Reassigns timer if value is not an empty string
    if (value.length >= 3) {
      timer = setTimeout(
          names => {
            getQuery({ variables: { names } });
            setState({ searchCriteria: value });
          }, 1000, value.split(" "));
    }
  }

  function onOkClick() {
    console.log(selectedCustomerId.substring(selectedCustomerId.lastIndexOf("-") + 1));
    setState({ redirect: true });
  }

  // Component proper
  const CustomerSelector = () => state.redirect ?
      <Redirect to={`${Paths.ADD_CUSTOMER}/${selectedCustomerId}`}/> :
      <React.Fragment>
        <FeatherInput id={SEARCH_INPUT_ID} iconName="search" placeholder="Nombre(s)"
                      caption="Agendar la cita a:" value={state.searchCriteria}
                      onChange={onCustomerChange}/>
        { loading && <LoadingPanel subject="Clientes"/> }
        { error && <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel> }
        { data && data.findCustomersByName && <CustomerSelectionResults names={data.findCustomersByName}/> }
      </React.Fragment>;

  const AppointmentCustomerSelector = getDetail(CustomerSelector, onOkClick);
  return <AppointmentCustomerSelector title="Agendar cita" okCaption="Confirmar" />;
}
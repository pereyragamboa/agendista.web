import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import ErrorPanel from '../commons/errorPanel';
import FeatherInput from '../commons/forms/featherInput';
import FeatherIcon from "../commons/featherIcon";
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import * as Paths from '../../constants/paths';

const query = gql`
  query findCustomers($names: [String]) { 
    findCustomersByName(names: $names) {
      id
      firstName
      lastName
      email
    }
  }`;

const CONFIRM_BUTTON_ID = "ag-confirm-user-selection";

function getCustomerRowId(customerId) {
  return `ag-customer-search-result-${customerId}`;
}

/**
 * Shows the results of a customer search.
 * @param props.names Customer information, from a customer query.
 * @return {*}
 * @constructor
 */
function CustomerSelectionResults(props) {
  const IS_ROW_SELECTED_CLASS = "is-selected";
  let selectedCustomerRowId = "";

  function onCustomerRowClick(e) {
    // Because the click() event will be raised from a <td>, we must query the parent of the clicked <td>
    const newId = e.target.parentElement.id;
    // Deselect current row, if present
    if (selectedCustomerRowId && selectedCustomerRowId !== newId) {
      document.getElementById(selectedCustomerRowId).classList.remove(IS_ROW_SELECTED_CLASS);
    }
    // Select new row
    document.getElementById(newId).classList.add(IS_ROW_SELECTED_CLASS);
    selectedCustomerRowId = newId;
    // Show confirm button
    document.getElementById(CONFIRM_BUTTON_ID).classList.remove("is-hidden");
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
          props.names.map(name => <tr id={getCustomerRowId(name.id)} key={name.id} onClick={onCustomerRowClick}>
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

  const [state, setState] = useState({
    searchCriteria: "" // Content of the customer name input
  });

  useEffect(() => {
    // Keeps focus on the search criteria input
    const searchInput = document.getElementById(SEARCH_INPUT_ID);
    if (searchInput) searchInput.focus();
  });

  const [getQuery, { loading, error, data }] = useLazyQuery(query);

  let timer = null; // Timer reference

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
            getQuery({ variables: {names} });
            setState({ searchCriteria: value });
          }, 1000, value.split(" "));
    }
  }

  return <React.Fragment>
    <FeatherInput id={SEARCH_INPUT_ID} iconName="search" placeholder="Nombre(s)" caption="Agendar la cita a:" value={state.searchCriteria}
                  onChange={onCustomerChange}/>
    { loading && <LoadingPanel subject="Clientes"/> }
    { error && <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel> }
    { data && data.findCustomersByName && <CustomerSelectionResults names={data.findCustomersByName}/> }
    <div className="field is-grouped is-grouped-right">
      <div className="control">
        <Link id={CONFIRM_BUTTON_ID} className="button is-success is-hidden" to={Paths.ADD_CUSTOMER}>
          <FeatherIcon iconName="user-check"/>
          <span>Confirmar cliente</span>
        </Link>
      </div>
    </div>
  </React.Fragment>
}
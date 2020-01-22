import React, { useState } from 'react';
import gql from 'graphql-tag';
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
    }
  }`;

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
  const [state, setState] = useState({
    selectedCustomerRowId: "",
  });

  const IS_ROW_SELECTED_CLASS = "is-selected";

  function onCustomerRowClick(e) {
    const currentId = state.selectedCustomerRowId;
    // Because the click() event will be raised from a <td>, we must query the parent of the clicked <td>
    const newId = e.target.parentElement.id;
    // Deselect current row, if present
    if (currentId && currentId !== newId) {
      document.getElementById(currentId).classList.remove(IS_ROW_SELECTED_CLASS);
    }
    // Select new row
    document.getElementById(newId).classList.add(IS_ROW_SELECTED_CLASS);
    setState({ selectedCustomerRowId: newId });
  }

  return props.names && props.names.length > 0 ?
      <table className="table is-hoverable">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
        </tr>
        </thead>
        <tbody style={{cursor: "pointer"}}>
        {
          props.names.map(name => <tr id={getCustomerRowId(name.id)} key={name.id} onClick={onCustomerRowClick}>
            <td>{name.firstName}</td>
            <td>{name.lastName}</td>
          </tr>)
        }
        </tbody>
      </table> :
      <div className="message is-warning">
        <p className="message-header">No se encontraron clientes.</p>
        <p className="message-body">Intente buscar otro nombre, o <a href={Paths.ADD_CUSTOMER}>agregar un nuevo cliente</a>.</p>
      </div>
}

export default function AppointmentCustomerSelector() {
  const [state, setState] = useState({
    searchCriteria: "" // Content of the customer name input
  });

  const [getQuery, { loading, error, data }] = useLazyQuery(query);

  let timer = null; // Timer reference

  function onCustomerChange(e) {
    if (timer != null) {
      // Resets timer
      clearTimeout(timer);
      timer = null;
    }
    const { value } = e.target;
    // Reassigns timer if value is not an empty string
    if (value) {
      timer = setTimeout(
          names => {
            getQuery({variables: {names}});
            setState({searchCriteria: value});
          }, 1000, value.split(" "));
    }
  }

  return <React.Fragment>
    <FeatherInput iconName="user" placeholder="Nombre(s)" caption="Agendar la cita a:" value={state.searchCriteria}
                  onChange={onCustomerChange}>
      <button className="button is-primary">
        <FeatherIcon iconName="user-plus"/>
        <span>Nuevo usuario...</span>
      </button>
    </FeatherInput>
    { loading && <LoadingPanel subject="Resultados de búsqueda"/> }
    { error && <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel> }
    { data && data.findCustomersByName && <CustomerSelectionResults names={data.findCustomersByName}/> }
    { data && data.findCustomersByName.length && <div className="field is-grouped is-grouped-right">
      <div className="control">
        <button className="button is-success is-right">
          <FeatherIcon iconName="arrow-right"/>
          <span>Siguiente</span>
        </button>
      </div>
    </div> }
  </React.Fragment>
}
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import ErrorPanel from '../commons/errorPanel';
import FeatherInput from '../commons/forms/featherInput';
import FeatherIcon from "../commons/featherIcon";
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import * as Paths from '../../constants/paths';

let timer = null; // Timer reference
const query = gql`
  query findCustomers($names: [String]) { 
    findCustomersByName(names: $names) {
      id
      firstName
      lastName
    }
  }`;

function CustomerSelectionResults(props) {
  return props.names && props.names.length > 0 ?
      <table className="table is-hoverable">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
        </tr>
        </thead>
        <tbody>
        {
          props.names.map(name => <tr key={name.id}>
            <td>{name.firstName}</td>
            <td>{name.lastName}</td>
          </tr>)
        }
        </tbody>
      </table> :
      <p>No se encontraron clientes. <a href={Paths.ADD_CUSTOMER}>¿Desea agregar un nuevo cliente?</a>.</p>
}

export default function AppointmentCustomerSelector() {
  const [state, setState] = useState({
    searchCriteria: "" // Content of the customer name input
  });

  const [getQuery, { loading, error, data }] = useLazyQuery(query);

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

    <button className="button is-success">
      <FeatherIcon iconName="arrow-right"/>
      <span>Siguiente</span>
    </button>
  </React.Fragment>
}
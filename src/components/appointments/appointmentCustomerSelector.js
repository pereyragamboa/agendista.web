import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useLazyQuery } from '@apollo/react-hooks';
import ErrorPanel from '../commons/errorPanel';
import FeatherInput from '../commons/forms/featherInput';
import getDetail, { enableOkButton } from '../commons/getDetail';
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/loadingPanel';
import * as Paths from '../../constants/paths';
import { FIND_CUSTOMERS_BY_NAME } from "../../data/queries/customerQueries";

export const ClassNames = {
  CUSTOMER_SELECTOR_ITEM: "ag-customer-selector-item",
  CUSTOMER_SELECTOR_ITEM_FIRST_NAME: "ag-customer-selector-item-first-name",
  CUSTOMER_SELECTOR_ITEM_LAST_NAME: "ag-customer-selector-item-last-name",
  CUSTOMER_SELECTOR_ITEM_EMAIL: "ag-customer-selector-item-email",
  CUSTOMER_SELECTOR_ITEM_SELECTED: "is-selected"
};

export const Ids = {
  CUSTOMER_SELECTOR: "ag-customer-selector",
  CUSTOMER_SELECTOR_NO_RESULTS: "ag-customer-selector-no-results",
  CUSTOMER_SELECTOR_SEARCH_BOX: "ag-customer-selector-search",
  getListItemId: id => `ag-customer-selector-item-${id}`
};

export const RUN_QUERY_TIMEOUT = 1000;

let selectedCustomerId = "";

/**
 * Shows the results of a customer search.
 * @param props.names Customer information, from a customer query.
 * @return {*}
 * @constructor
 */
function CustomerSelectionResults(props) {
  function onCustomerRowClick(e) {
    // Because the click() event will be raised from a <td>, we must query the parent of the clicked <td>
    let newId = undefined;
    if (e.target.tagName === 'TR') {
      newId = e.target.id;
    } else if (e.target.tagName === 'TD') {
      newId = e.target.parentElement.id;
    }
    // Deselect current row, if present
    if (selectedCustomerId && selectedCustomerId !== newId) {
      document.getElementById(selectedCustomerId).classList.remove(ClassNames.CUSTOMER_SELECTOR_ITEM_SELECTED);
    }
    // Select new row
    document.getElementById(newId).classList.add(ClassNames.CUSTOMER_SELECTOR_ITEM_SELECTED);
    selectedCustomerId = newId;
    // Show confirm button
    enableOkButton();
  }

  return props.names && props.names.length > 0 ?
      <div className="field">
      <table id={Ids.CUSTOMER_SELECTOR} className="table is-fullwidth is-hoverable">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th className="is-hidden-mobile">Correo electrónico</th>
        </tr>
        </thead>
        <tbody style={{cursor: "pointer"}}>
        {
          props.names.map(name =>
              <tr id={Ids.getListItemId(name.id)} key={name.id}
                  className={ClassNames.CUSTOMER_SELECTOR_ITEM}
                  onClick={onCustomerRowClick}>
                <td className={ClassNames.CUSTOMER_SELECTOR_ITEM_FIRST_NAME}>{name.firstName}</td>
                <td className={ClassNames.CUSTOMER_SELECTOR_ITEM_LAST_NAME}>{name.lastName}</td>
                <td className={`is-hidden-mobile ${ClassNames.CUSTOMER_SELECTOR_ITEM_EMAIL}`}>
                  {name.email}</td>
              </tr>)
        }
        </tbody>
      </table></div> :
      <div id={Ids.CUSTOMER_SELECTOR_NO_RESULTS} className="field message is-warning">
        <p className="message-header">No se encontraron clientes.</p>
        <p className="message-body">Intente buscar otro nombre, o <Link to={Paths.ADD_CUSTOMER}>agregar un nuevo cliente</Link>.</p>
      </div>
}

export default function AppointmentCustomerSelector() {
  // Hooks
  const [state, setState] = useState({
    searchCriteria: "", // Content of the customer name input
    redirect: false
  });

  useEffect(() => {
    // Keeps focus on the search criteria input
    const searchInput = document.getElementById(Ids.CUSTOMER_SELECTOR_SEARCH_BOX);
    if (searchInput) searchInput.focus();
  });

  const [getQuery, { loading, error, data }] = useLazyQuery(FIND_CUSTOMERS_BY_NAME);

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
          }, RUN_QUERY_TIMEOUT, value.split(" "));
    }
  }

  function onOkClick() {
    // Redirects application to add customer page
    setState({ redirect: true });
  }

  // Component proper
  const CustomerSelector = () => state.redirect ?
      <Redirect to={`${Paths.ADD_CUSTOMER}/${selectedCustomerId}`} push/> :
      <React.Fragment>
        <FeatherInput id={Ids.CUSTOMER_SELECTOR_SEARCH_BOX} iconName="search" placeholder="Nombre(s)"
                      caption="Agendar la cita a:" value={state.searchCriteria}
                      onChange={onCustomerChange}/>
        { loading && <LoadingPanel subject="Clientes"/> }
        { error && <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel> }
        { data && data.findCustomersByName && <CustomerSelectionResults names={data.findCustomersByName}/> }
      </React.Fragment>;

  const AppointmentCustomerSelector = getDetail(CustomerSelector, onOkClick);
  return <AppointmentCustomerSelector title="Agendar cita" okCaption="Confirmar" />;
}
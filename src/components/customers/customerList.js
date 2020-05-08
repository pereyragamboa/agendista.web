import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as Paths from '../../constants/paths';
import { CUSTOMERS } from '../../constants/headers';
import { DELETE_CUSTOMER_MODAL as MODAL_ID } from "../../constants/modalIds";
import DeleteButton from '../commons/alerts/deleteModalButton';
import DeleteModal from '../commons/alerts/deleteModal';
import EditLink from '../commons/editLink';
import ErrorPanel from '../commons/errorPanel';
import { GET_ALL_CUSTOMERS } from "../../data/queries/customerQueries";
import listGraphQLErrors from '../commons/listGraphQLErrors';
import LoadingPanel from '../commons/alerts/loadingPanel';

export const ClassNames = {
  CUSTOMER_LIST_ITEM: "ag-customer-list-item",
  CUSTOMER_LIST_FIRST_NAME: "ag-customer-list-first-name",
  CUSTOMER_LIST_LAST_NAME: "ag-customer-list-last-name",
  CUSTOMER_LIST_TELEPHONE: "ag-customer-list-telephone",
  CUSTOMER_LIST_EMAIL: "ag-customer-list-email",
  CUSTOMER_LIST_FULL_NAME: "ag-customer-list-full-name"
};

export const Ids = {
  CUSTOMER_LIST: "ag-customer-list",
  getListItemId: (id) => `ag-customer-list-item-${id}`
};

/**
 * Row element with customer information.
 *
 * @param props.email Email address of the customer.
 * @param props.firstNames First name(s) of the customer.
 * @param props.lastNames Last name(s) of the customer.
 * @param props.telephone Telephone number of the customer. The component makes no assumptions
 * on its data type.
 * @return {*}
 * @constructor
 */
function CustomerListItem(props) {
  const editUrl = Paths.UPDATE_CUSTOMER + props.customerId;
  return <tr className={ClassNames.CUSTOMER_LIST_ITEM} id={Ids.getListItemId(props.customerId)}>
    <td className="is-hidden-desktop">
      <EditLink to={editUrl} className={ClassNames.CUSTOMER_LIST_FULL_NAME}>
        {`${props.firstNames} ${props.lastNames}`}
      </EditLink>
    </td>
    <td className="is-hidden-touch">
      <EditLink to={editUrl} className={ClassNames.CUSTOMER_LIST_FIRST_NAME}>
        {props.firstNames}
      </EditLink>
    </td>
    <td className="is-hidden-touch">
      <EditLink to={editUrl} className={ClassNames.CUSTOMER_LIST_LAST_NAME}>
        {props.lastNames}
      </EditLink>
    </td>
    <td className={`is-hidden-touch ${ClassNames.CUSTOMER_LIST_TELEPHONE}`}>
      {props.telephone}</td>
    <td className={`is-hidden-touch ${ClassNames.CUSTOMER_LIST_EMAIL}`}>
      {props.email}</td>
    <td><DeleteButton modalId={MODAL_ID} /></td>
  </tr>;
}

/**
 * List of customers.
 *
 * @return {*}
 * @constructor
 */
export default function CustomerList() {
  const { loading, error, data } = useQuery(GET_ALL_CUSTOMERS);
  if (loading) return <LoadingPanel subject={CUSTOMERS}/>;
  if (error) return <ErrorPanel>{listGraphQLErrors(error)}</ErrorPanel>;
  return <React.Fragment>
    <table id={Ids.CUSTOMER_LIST} className="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Nombre</th>
          <th className="is-hidden-touch">Apellido</th>
          <th className="is-hidden-touch">Teléfono</th>
          <th className="is-hidden-touch">Correo electrónico</th>
          <th/>
        </tr>
      </thead>
      <tbody>
      {
        data.getAllCustomers.map(customer =>
          <CustomerListItem key={`ag-customer-id-${customer.id}`}
                            customerId={customer.id}
                            firstNames={customer.firstName} lastNames={customer.lastName}
                            telephone={customer.telephone} email={customer.email}
          />
        )
      }
      </tbody>
    </table>
    <DeleteModal id={MODAL_ID}>
      <p>¿Desea eliminar este cliente?</p>
      <p><strong>Nota:</strong> Las citas previas del cliente no serán eliminadas.</p>
    </DeleteModal>
  </React.Fragment>;
}
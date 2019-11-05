import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import * as Paths from '../../constants/paths';
import { DELETE_CUSTOMER_MODAL as MODAL_ID } from "../../constants/modalIds";
import DeleteButton from '../commons/modals/deleteModalButton';
import DeleteModal from '../commons/modals/deleteModal';
import EditLink from '../commons/editLink';

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
  return <tr>
    <td className="is-hidden-desktop">
      <EditLink to={Paths.UPDATE_CUSTOMER}>{`${props.firstNames} ${props.lastNames}`}</EditLink>
    </td>
    <td className="is-hidden-touch">
      <EditLink to={Paths.UPDATE_CUSTOMER}>{props.firstNames}</EditLink>
    </td>
    <td className="is-hidden-touch">
      <EditLink to={Paths.UPDATE_CUSTOMER}>{props.lastNames}</EditLink>
    </td>
    <td className="is-hidden-touch">{props.telephone}</td>
    <td className="is-hidden-touch">{props.email}</td>
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
  const { loading, error, data } = useQuery(gql`{
    getAllCustomers {
        id
        firstName
        lastName
        telephone
        email
    }}
  `);
  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>Error: {error}</p>;
  return <React.Fragment>
    <table className="table is-fullwidth is-hoverable">
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
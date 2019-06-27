import React from 'react';
import DeleteButton from '../commons/deleteModalButton';
import DeleteModal from '../commons/deleteModal';
import EditLink from '../commons/editLink';
import * as Paths from '../../paths';

const MODAL_ID = "ag-deleteCustomerModal";

/**
 * Renders a list item with customer information.
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
      <EditLink to={Paths.ADD_CUSTOMER}>{`${props.firstNames} ${props.lastNames}`}</EditLink>
    </td>
    <td className="is-hidden-touch">
      <EditLink to={Paths.ADD_CUSTOMER}>{props.firstNames}</EditLink>
    </td>
    <td className="is-hidden-touch">
      <EditLink to={Paths.ADD_CUSTOMER}>{props.lastNames}</EditLink>
    </td>
    <td className="is-hidden-touch">{props.telephone}</td>
    <td className="is-hidden-touch">{props.email}</td>
    <td><DeleteButton modalId={MODAL_ID} /></td>
  </tr>;
}

export default function CustomerList() {
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
        <CustomerListItem firstNames="Sansón" lastNames="Carrasco"
                          telephone="1609-1616" email="b-sc@example.com"/>
        <CustomerListItem firstNames="Rosa Guadalupe" lastNames="Godínez"
                          telephone="1234-5678" email="lupegodinez@example.io"/>
        <CustomerListItem firstNames="Martín" lastNames="Pereyra Gamboa"
                          telephone="1123-5813" email="mpereyra@example.com"/>
      </tbody>
    </table>
    <DeleteModal id={MODAL_ID}>
      <p>¿Desea eliminar este cliente?</p>
      <p><strong>Nota:</strong> Las citas previas del cliente no serán eliminadas.</p>
    </DeleteModal>
  </React.Fragment>;
}
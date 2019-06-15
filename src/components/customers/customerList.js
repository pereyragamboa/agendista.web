import React from 'react';
import DeleteButton from '../commons/deleteButton';
import { Link } from 'react-router-dom'
import * as Paths from '../../paths';

function CustomerListItem(props) {
  const EditLink = (props) => <Link to={Paths.ADD_CUSTOMER}>{props.caption}</Link>;

  return <tr>
    <td className="is-hidden-desktop">
      <EditLink caption={`${props.firstNames} ${props.lastNames}`}/>
    </td>
    <td className="is-hidden-touch"><EditLink caption={props.firstNames}/></td>
    <td className="is-hidden-touch"><EditLink caption={props.lastNames}/></td>
    <td className="is-hidden-touch">{props.telephone}</td>
    <td className="is-hidden-touch">{props.email}</td>
    <td><DeleteButton /></td>
  </tr>;
}

export default function CustomerList() {
  return <table className="table is-fullwidth">
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
      <CustomerListItem firstNames="Rosa Guadalupe" lastNames="Godínez"
                        telephone="1234-5678" email="lupegodinez@example.io"/>
      <CustomerListItem firstNames="Martín" lastNames="Pereyra Gamboa"
                        telephone="1123-5813" email="mpereyra@example.com"/>
    </tbody>
  </table>;
}
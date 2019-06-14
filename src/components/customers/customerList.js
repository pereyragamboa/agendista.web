import React from 'react';
import ListItemButtons from "../commons/listItemButtons";

function CustomerListItem(props) {
  return <tr>
    <td className="is-hidden-desktop">{`${props.firstNames} ${props.lastNames}`}</td>
    <td className="is-hidden-touch">{props.firstNames}</td>
    <td className="is-hidden-touch">{props.lastNames}</td>
    <td className="is-hidden-touch">{props.telephone}</td>
    <td className="is-hidden-touch">{props.email}</td>
    <td><ListItemButtons/></td>
  </tr>;
}

export default function CustomerList() {
  return <table className="table is-fullwidth">
    <thead>
      <th>Nombre</th>
      <th className="is-hidden-touch">Apellido</th>
      <th className="is-hidden-touch">Teléfono</th>
      <th className="is-hidden-touch">Correo electrónico</th>
      <th/>
    </thead>
    <tbody>
      <CustomerListItem firstNames="José Candelario" lastNames="Tres Patines"
                        telephone="1234-5678" email="3patines@example.com.cu"/>
      <CustomerListItem firstNames="Martín" lastNames="Pereyra Gamboa"
                        telephone="1123-5813" email="mpereyra@example.com"/>
    </tbody>
  </table>;
}
import React from 'react';
import FeatherInput from '../commons/forms/featherInput';
import FeatherIcon from "../commons/featherIcon";

export default function AppointmentCustomerSelector() {
  return <React.Fragment>
    <FeatherInput iconName="user" placeholder="Nombre(s)" caption="Agendar la cita a:">
      <button className="button is-primary">
        <FeatherIcon iconName="search"/>
      </button>
    </FeatherInput>
    <button className="button is-success">
      <FeatherIcon iconName="arrow-right"/>
      <span>Siguiente</span>
    </button>
  </React.Fragment>
}
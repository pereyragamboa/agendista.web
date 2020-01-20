import React from 'react';
import FeatherInput from '../commons/forms/featherInput';
import FeatherIcon from "../commons/featherIcon";

let timer = null; // Timer reference

function onCustomerChange(e) {
  if (timer != null) {
    // Resets timer
    clearTimeout(timer);
    timer = null;
  }
  // Reassigns timer
  timer = setTimeout(x => console.log(x), 1000, e.target.value);
}

export default function AppointmentCustomerSelector() {
  return <React.Fragment>
    <FeatherInput iconName="user" placeholder="Nombre(s)" caption="Agendar la cita a:" onChange={onCustomerChange}>
      <button className="button is-primary">
        <FeatherIcon iconName="search"/>
      </button>
    </FeatherInput>
    <table className="table">
    </table>
    <button className="button is-success">
      <FeatherIcon iconName="arrow-right"/>
      <span>Siguiente</span>
    </button>
  </React.Fragment>
}
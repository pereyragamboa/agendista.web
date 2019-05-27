import React, { Component } from 'react';

class AppointmentDetail extends Component {
  render() {
    return (
      <div>
        <div className="field">
          <label className="label">Nombre completo</label>
          <div className="control">
            <input className="input" type="text" placeholder="Nombre completo del cliente"/>
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentDetail;
import React from 'react';
import { Link } from 'react-router-dom';
import * as Paths from '../../paths';
import FeatherIcon from '../commons/featherIcon';

export default function ServiceDetail () {
  return <div>
    <h1 className="title">Nuevo servicio</h1>
    <div className="box">
      <div className="field">
        <label className="label">Servicio</label>
        <div className="control has-icons-left">
          <input className="input" type="text" placeholder="Título del servicio"/>
          <span className="icon is-left"><FeatherIcon iconName="shopping-bag"/></span>
        </div>
      </div>
      <div className="field">
        <label className="label">Descripción</label>
        <div className="control">
          <textarea className="textarea" rows="3" placeholder="Descripción del servicio"/>
        </div>
      </div>
      <div className="field">
        <label className="label">Duración</label>
        <div className="control has-icons-left">
          <input className="input" type="time"/>
          <span className="icon is-left"><FeatherIcon iconName="clock"/></span>
        </div>
      </div>
      <div className="field">
        <label className="label">Costo</label>
        <div className="control has-icons-left">
          <input className="input" type="number" placeholder="Costo del servicio"/>
          <span className="icon is-left"><FeatherIcon iconName="tag"/></span>
        </div>
      </div>
    </div>
    <div className="buttons">
      <button className="button is-primary">
        <FeatherIcon iconName="plus"/>
        <span>Agregar</span></button>
      <button className="button is-primary">
        <FeatherIcon iconName="edit-2"/>
        <span>Modificar</span></button>
      <Link className="button" to={Paths.LIST_SERVICES}>
        <FeatherIcon iconName="x"/>
        <span>Cancelar</span></Link>
    </div>
  </div>
};
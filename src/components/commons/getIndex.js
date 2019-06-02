import React, { Component } from 'react';
import FeatherIcon from './featherIcon';

// The consts and onBurgerClick() are defined outside the exported class because
// we don't need to expose them

const NAVBAR_BURGER_ID = "navbarBurgerMenu";
const NAVBAR_MENU_ID = "navbarMenuId";

function onBurgerClick() {
  const burgerElement = document.getElementById(NAVBAR_BURGER_ID);
  const menuElement = document.getElementById(NAVBAR_MENU_ID);
  burgerElement.classList.toggle("is-active");
  menuElement.classList.toggle("is-active");
}

// Higher order component:
//
// ContentComponent: the component rendering the list of objects
// NavbarComponents: an object containing the navbar items
//   -brand: content of navbar-brand; if present, this will override props.title
//   -endItems: content of navbar-end
//
// props:
//   - id: identifier of the HOC
//   - title: displayed title of the HOC
export default function getIndex(ContentComponent, NavbarComponents){
  return class extends Component {
    constructor(props){
      super(props);
      console.log(props);
    }

    render() {
      return <div id={this.props.id}>
        <div>
          <nav className="navbar" role="navigation">
            <div className="navbar-brand">
              <h1 className="title is-size-4 navbar-item">{ this.props.brand }</h1>
              <div id={NAVBAR_BURGER_ID} className="navbar-burger"
                   role="button" aria-label="button" aria-expanded="false"
                   data-target={NAVBAR_MENU_ID}
                   onClick={ onBurgerClick }>
                {
                  [1, 2, 3].map(() => <span aria-hidden="true"/>)
                }</div>
            </div>
            <div id={NAVBAR_MENU_ID} className="navbar-menu">
              <div className="navbar-end">
                { NavbarComponents.endItems }
              </div>
            </div>
          </nav>
        </div>
        <div className="box">
          { ContentComponent }
          <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <div className="pagination-previous"><FeatherIcon iconName="arrow-left"/>Anterior</div>
            <div className="pagination-next">Siguiente<FeatherIcon iconName="arrow-right"/></div>
            <ul className="pagination-list">
              <li><div className="pagination-link" aria-label="Goto page 1">1</div></li>
              <li><span className="pagination-ellipsis">&hellip;</span></li>
              <li><div className="pagination-link is-hidden-mobile" aria-label="Goto page 5">5</div></li>
              <li><div className="pagination-link is-current" aria-label="Page 6" aria-current="page">6</div></li>
              <li><div className="pagination-link is-hidden-mobile" aria-label="Goto page 7">7</div></li>
              <li><span className="pagination-ellipsis">&hellip;</span></li>
              <li><div className="pagination-link" aria-label="Goto page 11">11</div></li>
            </ul>
          </nav>
        </div>
      </div>
    }
  }
}
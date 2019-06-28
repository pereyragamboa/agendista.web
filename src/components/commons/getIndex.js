import React, { Component } from 'react';
import BurgerMenu from './burgerMenu';
import FeatherIcon from './featherIcon';

// The consts and onBurgerClick() are defined outside the exported class because
// we don't need to expose them

const NAVBAR_BURGER_ID = "navbarBurgerMenu";
const NAVBAR_MENU_ID = "navbarMenuId";

/**
 *
 * Higher order component that creates a main feature screen. A feature screen
 * is composed of the following:
 *   * A navbar with buttons for actions relevant to the feature
 *   * A list of one or more elements, or an empty screen
 *   * A pagination component after the list
 *
 * @param ContentComponent the component rendering the list of objects
 * @param NavbarComponents object containing the navbar items
 * @param NavbarComponents.brandItems content of navbar-brand
 * @param NavbarComponents.endItems content of navbar-end
 * @return {{new(): Index, prototype: Index}}
 */
export default function getIndex(ContentComponent, NavbarComponents = []){
  /**
   * @param props.brand Basic caption for the brand; overriden by NavbarComponents.brandItems
   * @param props.featherIcon Name of the Feather icon
   * @param props.id Identifier of the component
   */
  return class Index extends Component {
    render() {
      return <section id={this.props.id}>
        <nav className="navbar" role="navigation">
            <div className="navbar-brand">
              {
                NavbarComponents.brandItems ||
                (<div className="navbar-item">
                  <FeatherIcon iconName={ this.props.featherIcon }/>
                  &nbsp;
                  <h1 className="title is-4">{ this.props.brand }</h1>
                </div>)
              }
              <BurgerMenu id={NAVBAR_BURGER_ID} target={NAVBAR_MENU_ID}/>
            </div>
            <div id={NAVBAR_MENU_ID} className="navbar-menu">
              <div className="navbar-end">
                { NavbarComponents.endItems }
              </div>
            </div>
          </nav>
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
      </section>
    }
  }
}
import React, { Component } from 'react';
import BurgerMenu from './navbars/burgerMenu';
import FeatherIcon from './featherIcon';

const NAVBAR_BURGER_ID = "index-navbar-burger-menu";
const NAVBAR_MENU_ID = "index-navbar-menu-id";

export const Ids = {
  NAVBAR_BURGER_ID,
  NAVBAR_MENU_ID,
  NAVBAR_BRAND: "index-navbar-brand",
  NAVBAR_END: "index-navbar-end",
  NAVBAR_BRAND_ICON: "index-navbar-brand-icon",
  NAVBAR_BRAND_TITLE: "index-navbar-brand-title"
};

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
export default function getIndex(ContentComponent, NavbarComponents = {}){
  /**
   * @param props.brand Basic caption for the brand; overriden by NavbarComponents.brandItems
   * @param props.featherIcon Name of the Feather icon; overriden by NavbarComponents.brandItems
   * @param props.id Identifier of the component
   */
  return class Index extends Component {
    render() {
      const { featherIcon, brand } = this.props;
      const hasBrandProps = featherIcon && brand;

      return <section id={this.props.id}>
        <nav className="navbar" role="navigation">
            <div id={Ids.NAVBAR_BRAND} className="navbar-brand">
              {
                NavbarComponents.brandItems || (
                    <div className="navbar-item">
                    {
                      featherIcon &&
                      <FeatherIcon id={Ids.NAVBAR_BRAND_ICON} iconName={ this.props.featherIcon }/>
                    }
                    { hasBrandProps && <>&nbsp;</> }
                    {
                      brand &&
                      <h1 id={Ids.NAVBAR_BRAND_TITLE} className="title is-4">{ this.props.brand }</h1>
                    }
                    </div>
                )
              }
              <BurgerMenu id={NAVBAR_BURGER_ID} target={NAVBAR_MENU_ID}/>
            </div>
            <div id={NAVBAR_MENU_ID} className="navbar-menu">
              <div id={Ids.NAVBAR_END} className="navbar-end">
                { NavbarComponents.endItems }
              </div>
            </div>
          </nav>
        <div className="box">
          { ContentComponent }
        </div>
      </section>
    }
  }
}
import React from 'react';

/**
 * Burger menu button / icon.
 * @param props.id Identifier of the component.
 * @param props.target Identifier of the menu to be displayed.
 * @return {*}
 * @constructor
 */
export default function BurgerMenu(props) {
  if (!props.id)
    throw new Error("ID missing from <BurgerMenu>.");
  if (!props.target)
    throw new Error("Target menu ID missing from <BurgerMenu>.");

  function onBurgerClick() {
    const burgerElement = document.getElementById(props.id);
    const menuElement = document.getElementById(props.target);
    burgerElement.classList.toggle("is-active");
    menuElement.classList.toggle("is-active");
  }

  return <div className="navbar-burger"
            id={props.id}
            role="button" aria-label="button" aria-expanded="false"
            data-target={props.target}
            onClick={ onBurgerClick }>
  {
    [1, 2, 3].map((i) => <span key={`ag-burger-menu-${props.id}-${i}`} aria-hidden="true"/>)
  }
  </div>

}
import React from 'react';

export default function BurgerMenu(props) {

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
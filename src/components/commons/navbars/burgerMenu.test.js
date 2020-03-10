import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import BurgerMenu from './burgerMenu';
import ClickEvent from '../../testHelpers/clickEvent';
import TestContainer from '../../testHelpers/testContainer';

describe("<BurgerMenu> tests", () => {
  describe("Basic functionality", () => {
    const container = new TestContainer();
    const BURGER_ICON = "test-burger-icon";
    const BURGER_MENU = "test-burger-menu";

    beforeAll(() => {
      container.createContainer();
      render(
          <>
            <BurgerMenu id={BURGER_ICON} target={BURGER_MENU}/>
            <ul id={BURGER_MENU}>
              <li>First</li>
              <li>Second</li>
            </ul>
          </>,
          container.getContainer());
    });

    beforeEach(() => {
      const burgerIcon = document.getElementById(BURGER_ICON);
      act(() => {
        burgerIcon.dispatchEvent(ClickEvent);
      });
    });

    test("displays menu on click", () => {
      expect(document.getElementById(BURGER_ICON).classList.contains("is-active")).toBeTruthy();
      expect(document.getElementById(BURGER_MENU).classList.contains("is-active")).toBeTruthy();
    });

    test("hides menu on click", () => {
      expect(document.getElementById(BURGER_ICON).classList.contains("is-active")).toBeFalsy();
      expect(document.getElementById(BURGER_MENU).classList.contains("is-active")).toBeFalsy();
    });
  });

  describe("Errors", () => {
    const testContainer = new TestContainer();

    beforeAll(testContainer.createContainer);

    test("missing burger icon ID", () => {
      expect(() => render(<BurgerMenu/>, testContainer.getContainer())).toThrow();
    });

    test("missing target menu ID", () => {
      expect(() => render(<BurgerMenu id={"burger-menu"}/>, testContainer.getContainer())).toThrow();
    });

    afterAll(testContainer.disposeContainer);
  });
});
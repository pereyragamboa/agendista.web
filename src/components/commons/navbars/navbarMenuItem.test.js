import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router';
import NavbarMenuItem from './navbarMenuItem';
import ClickEvent from '../../testHelpers/clickEvent';
import TestContainer from '../../testHelpers/testContainer';
import { testIconRender } from "../../testHelpers/expectFunctions";

describe("<NavbarMenuItem> tests", () => {
  const testContainer = new TestContainer();
  const ITEM_ID = "test-item";

  beforeEach(testContainer.createContainer);

  afterEach(testContainer.disposeContainer);

  describe("Rendering tests", () => {
    const TEXT_CONTENT = "Menu item";

    test("shows icon and text", () => {
      act(() => {
        render(
            <NavbarMenuItem id={ITEM_ID} featherIcon="feather" caption={TEXT_CONTENT}/>,
            testContainer.getContainer());
      });
      testIconRender();
      expect(testContainer.getContainer().textContent.trim()).toBe(TEXT_CONTENT);
    });

    test("shows only icon", () => {
      act(() => {
        render(
            <NavbarMenuItem id={ITEM_ID} featherIcon="feather"/>, testContainer.getContainer()
        );
      });
      testIconRender();
      expect(document.textContent).toBeNull();
    });

    test("shows only text", () => {
      act(() => {
        render(
            <NavbarMenuItem id={ITEM_ID} caption={TEXT_CONTENT}/>, testContainer.getContainer()
        );
      });
      testIconRender(0);
      expect(testContainer.getContainer().textContent).toBe(TEXT_CONTENT);
    });
  });

  describe("Interaction tests", () => {
    test("goes to item path", () => {
      const NavbarItem = () => <NavbarMenuItem id={ITEM_ID} path="/test" caption="Test" featherIcon="feather"/>;
      const TestItem = () => <p>Test component</p>;
      render(
          <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <Route exact path={"/"} component={NavbarItem}/>
            <Route exact path={"/test"} component={TestItem}/>
          </MemoryRouter>, testContainer.getContainer()
      );
      act(() => {
        document.getElementById(ITEM_ID).dispatchEvent(ClickEvent);
      });
      expect(testContainer.getContainer().textContent).toBe("Test component");
    });

    test("calls click function", () => {
      const clickCallback = jest.fn();
      render(
        <NavbarMenuItem id={ITEM_ID} onClick={clickCallback} caption="Click test"/>,
          testContainer.getContainer()
      );
      act(() => {
        document.getElementById(ITEM_ID).dispatchEvent(ClickEvent);
      });
      expect(clickCallback).toBeCalledTimes(1);
    });
  });

  test("throws error when lacking content props", () => {
    expect(() => {
      render(<NavbarMenuItem/>, testContainer.getContainer())
    }).toThrow();
  });
});
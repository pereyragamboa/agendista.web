import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Route } from 'react-router';
import { act } from 'react-dom/test-utils';
import TestContainer from '../testHelpers/testContainer';
import ListItemButtons, { ClassNames } from './listItemButtons';

describe("<ListItemButtons> tests", () => {
  const testContainer = new TestContainer();
  let domContainer = null;

  describe("Render", () => {
    beforeAll(() => {
      domContainer = testContainer.createContainer();
      act(() => {
        render(<ListItemButtons/>, domContainer);
      });
    });

    afterAll(() => {
      testContainer.disposeContainer();
    });

    it("renders two buttons", () => {
      expect(domContainer.getElementsByClassName(ClassNames.EDIT_LIST_ITEM_BUTTON).length).toBe(1);
      expect(domContainer.getElementsByClassName(ClassNames.DELETE_LIST_ITEM_BUTTON).length).toBe(1);
    });

    it("renders two icons", () => {
      expect(domContainer.getElementsByTagName("svg").length).toBe(2);
    });
  });

  describe("Events", () => {
    const EDIT_TEXT = "Mock edit";
    beforeAll(() => {
      domContainer = testContainer.createContainer();
      act(() => {
        render(
            <MemoryRouter initialEntries={["/"]} initialIndex={0}>
              <Route exact path={"/"} component={
                () => <ListItemButtons editPath={"/edit"}/>
              }/>
              <Route exact path={"/edit"} component={() => <div>{EDIT_TEXT}</div>}/>
            </MemoryRouter>, domContainer);
      });
    });

    it("goes to edit URL", () => {
      const editButton = domContainer.getElementsByTagName("a")[0];
      act(() => {
        editButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(domContainer.textContent).toBe(EDIT_TEXT);
    });

    it.todo("shows delete confirmation modal");

    afterAll(() => { testContainer.disposeContainer(); });
  });
});
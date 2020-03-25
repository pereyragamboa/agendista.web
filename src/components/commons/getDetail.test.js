import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import getDetail, { ButtonIds, ElementIds } from './getDetail';
import TestContainer from '../testHelpers/testContainer';
import { expectTextInElement } from "../testHelpers/expectFunctions";

describe("getDetail() HOC tests", () => {
  let container = null;

  beforeAll(() => {
    container = new TestContainer();
  });

  describe("Fully specified component", () => {
    let div = null;
    beforeAll(() => {
      div = container.createContainer("div");
      const Detail = getDetail(() => <div id="test-content">Test content</div>);

      act(() => {
        render(<Detail title="Test" featherIcon="feather" okCaption="Yes" cancelCaption="No"/>, div);
      });
    });

    it("renders buttons", () => {
      expectTextInElement(ButtonIds.OK_BUTTON, "Yes");
      expectTextInElement(ButtonIds.CANCEL_BUTTON, "No");
    });

    it("renders title", () => {
      expectTextInElement(ElementIds.TITLE, "Test");
      const titleIcon = document.getElementById(ElementIds.TITLE_ICON);
      expect(titleIcon).not.toBe(null);
      expect(titleIcon.tagName).toBe("svg");
      expect(titleIcon.classList.contains("feather-feather")).toBe(true);
    });

    it("renders inner component", () => {
      expectTextInElement("test-content", "Test content");
    });

    afterAll(() => {
      container.disposeContainer();
    });
  });

  describe("Component without props", () => {
    let div = null;

    beforeAll(() => {
      div = container.createContainer();
      const Detail = getDetail(() => <div id="test-content">No props</div>);

      act(() => {
        render(<Detail/>, div);
      });
    });

    it("has no icon", () => {
      const icon = document.getElementById(ElementIds.TITLE_ICON);
      expect(icon).toBe(null);
    });

    it("has no title", () => {
      // This is not replaced with expect helper because is asserting a different thing
      const title = document.getElementById(ElementIds.TITLE);
      expect(title.textContent).toBe("");
    });

    it("has default button captions", () => {
      expectTextInElement(ButtonIds.OK_BUTTON, "Agregar");
      expectTextInElement(ButtonIds.CANCEL_BUTTON, "Cancelar");
    });
  });
});

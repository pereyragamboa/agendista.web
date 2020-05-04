import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Detail, { Ids } from './detail';
import TestContainer from '../testHelpers/testContainer';
import { expectTextInElement } from "../testHelpers/expectFunctions";

describe("<Detail> tests", () => {
  let container = null;

  beforeAll(() => {
    container = new TestContainer();
  });

  describe("Fully specified component", () => {
    let div = null;
    beforeAll(() => {
      div = container.createContainer("div");
      act(() => {
        render(<Detail title="Test" featherIcon="feather" okCaption="Yes" cancelCaption="No">
          <div id="test-content">Test content</div>
        </Detail>, div);
      });
    });

    it("renders buttons", () => {
      expectTextInElement(Ids.OK_BUTTON, "Yes");
      expectTextInElement(Ids.CANCEL_BUTTON, "No");
    });

    it("renders title", () => {
      expectTextInElement(Ids.TITLE, "Test");
      const titleIcon = document.getElementById(Ids.TITLE_ICON);
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

      act(() => {
        render(<Detail><div id="test-content">No props</div></Detail>, div);
      });
    });

    it("has no icon", () => {
      const icon = document.getElementById(Ids.TITLE_ICON);
      expect(icon).toBe(null);
    });

    it("has no title", () => {
      // This is not replaced with expect helper because is asserting a different thing
      const title = document.getElementById(Ids.TITLE);
      expect(title.textContent).toBe("");
    });

    it("has default button captions", () => {
      expectTextInElement(Ids.OK_BUTTON, "Agregar");
      expectTextInElement(Ids.CANCEL_BUTTON, "Cancelar");
    });
  });
});

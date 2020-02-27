import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import getDetail, { ButtonIds, ElementIds } from './getDetail';
import TestContainer from '../testHelpers/testContainer';

describe("getDetail() HOC tests", () => {
  let container = null;

  describe("Fully specified component", () => {
    beforeAll(() => {
      container = new TestContainer().createContainer("div");
      const Detail = getDetail(() => <div id="test-content">Test content</div>);

      act(() => {
        render(<Detail title="Test" featherIcon="feather" okCaption="Yes" cancelCaption="No"/>, container);
      });
    });

    it("renders buttons", () => {
      const okButton = document.getElementById(ButtonIds.OK_BUTTON);
      const cancelButton = document.getElementById(ButtonIds.CANCEL_BUTTON);
      expect(okButton).not.toBe(null);
      expect(cancelButton).not.toBe(null);
      expect(okButton.textContent).toBe("Yes");
      expect(cancelButton.textContent).toBe("No");
    });

    it("renders title", () => {
      const title = document.getElementById(ElementIds.TITLE);
      expect(title).not.toBe(null);
      expect(title.textContent).toBe("Test");
      const titleIcon = document.getElementById(ElementIds.TITLE_ICON);
      expect(titleIcon).not.toBe(null);
      expect(titleIcon.tagName).toBe("svg");
      expect(titleIcon.classList.contains("feather-feather")).toBe(true);
    });

    it("renders inner component", () => {
      const content = document.getElementById("test-content");
      expect(content).not.toBe(null);
      expect(content.textContent).toBe("Test content");
    });

    afterAll(() => {
      container.disposeContainer();
    })
  });

  describe("Component without props", () => {
    beforeAll(() => {
      container = new TestContainer().createContainer("div");
      const Detail = getDetail(() => <div id="test-content">No props</div>);

      act(() => {
        render(<Detail/>, container);
      });
    });

    it("has no icon", () => {
      const icon = document.getElementById(ElementIds.TITLE_ICON);
      expect(icon).toBe(null);
    });

    it("has no title", () => {
      const title = document.getElementById(ElementIds.TITLE);
      expect(title.textContent).toBe("");
    });

    it("has default button captions", () => {
      const okButton = document.getElementById(ButtonIds.OK_BUTTON);
      expect(okButton.textContent).toBe("Agregar");
      const cancelButton = document.getElementById(ButtonIds.CANCEL_BUTTON);
      expect(cancelButton.textContent).toBe("Cancelar");
    });
  });
});

import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import ErrorPanel from './errorPanel';
import TestContainer from '../testHelpers/testContainer';

describe("<ErrorPanel> tests", () => {
  describe("Empty <ErrorPanel> tests", () => {
    const container = TestContainer();

    beforeEach(() => {
      container.createContainer();
      act(() => {
        render(<ErrorPanel/>, container.getContainer());
      });
    });

    it("renders X icon", () => {
      const c = container.getContainer();
      const svg = c.getElementsByTagName("svg");
      expect(svg.length).toBe(1);
      expect(svg[0].classList.contains("feather-x-circle")).toBe(true);
    });
    it("renders title", () => {
      const c = container.getContainer();
      const header = c.getElementsByTagName("h1");
      expect(header.length).toBe(1);
      expect(header.innerText).not.toBe("");
    });
    it("does not render report block", () => {
      const c = container.getContainer();
      const reportHeader = c.getElementsByTagName("h3");
      expect(reportHeader.length).toBe(0);
    });

    afterEach(container.disposeContainer)
  });

  test("renders report block", () => {
    const container = new TestContainer();
    container.createContainer();
    act(() => {
      render(
          <ErrorPanel>
            <p>Foo</p>
            <p>Bar</p>
          </ErrorPanel>, container.getContainer())
    });
    const c = container.getContainer();

    expect(c.getElementsByTagName("h3").length).toBe(1);
    container.disposeContainer();
  })
});
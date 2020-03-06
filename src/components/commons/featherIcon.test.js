import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import FeatherIcon from './featherIcon';
import TestContainer from '../testHelpers/testContainer';

describe("<FeatherIcon> tests", () => {
  describe("Renders component", () => {
    test("Matches snapshot", () => {
      const testRender = TestRenderer.create(<FeatherIcon iconName="feather"/>);
      expect(testRender.toJSON()).toMatchSnapshot();
    });

    test("Contains an icon", () => {
      const testContainer = new TestContainer();
      testContainer.createContainer();
      act(() => {
        render(<FeatherIcon iconName="feather"/>, testContainer.getContainer());
      });
      expect(testContainer.getContainer().getElementsByTagName("svg").length).toBe(1);
      testContainer.disposeContainer();
    });
  });
  test("Throws error at empty component", () => {
    const testContainer = new TestContainer();
    testContainer.createContainer();
    expect(() => {
      render(<FeatherIcon iconName="fnord"/>, testContainer.getContainer())
    }).toThrow();
    testContainer.disposeContainer();
  })
});
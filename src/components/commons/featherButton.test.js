import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import FeatherButton from './featherButton';
import TestContainer from '../testHelpers/testContainer';

describe("<FeatherButton> tests", () => {
  const testContainer = new TestContainer();

  beforeEach(testContainer.createContainer);
  afterEach(testContainer.disposeContainer);

  test("throws error with empty non-button", () => {
    expect(() => {
      render(<FeatherButton/>, testContainer.getContainer())
    }).toThrow();
  });

  test("renders button with icon only", () => {
    act(() => {
      render(<FeatherButton featherIcon="feather"/>, testContainer.getContainer());
    });
    const svg = testContainer.getContainer().getElementsByTagName("svg")[0];
    expect(svg).not.toBe(undefined);
    expect(svg.classList).toContain("feather-feather");
  });

  test("Contains text", () => {
    const testContainer = new TestContainer();
    testContainer.createContainer();
    act(() => {
      render(<FeatherButton featherIcon="feather" caption="Feather"/>, testContainer.getContainer());
    });
    expect(testContainer.getContainer().textContent).toBe("Feather");
  })

});
import React from 'react';
import { render } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import TestContainer from '../../testHelpers/testContainer';
import Notification from './notification';

const TEST_ID = "test-notification";

describe("<Notification> tests", () => {
  const container = new TestContainer();

  afterEach(() => {
    container.disposeContainer();
  });

  test("Show notification", () => {
    render(<Notification id={TEST_ID}><p>Hello world</p></Notification>, container.createContainer());
    expect(document.getElementById(TEST_ID)).not.toBeNull();
  });

  test.skip("Hide notification by clicking button", async () => {
    const button = container.getContainer().getElementsByTagName("BUTTON")[0];
    await act(async() => {
      await Simulate.click(button);
    });
    expect(document.getElementById(TEST_ID)).toBeNull();
  });
});
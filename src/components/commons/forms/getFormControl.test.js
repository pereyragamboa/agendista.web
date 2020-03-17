import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import getFormControl, { ClassNames } from './getFormControl';
import TestContainer from '../../testHelpers/testContainer';

describe("getFormControl() tests", () => {
  const testContainer = new TestContainer();
  const TEST_CAPTION = "Test control";

  describe("Basic render tests", () => {
    beforeAll(() => {
      testContainer.createContainer();
      const FormControl = getFormControl(() => <input type="number"/>);
      act(() => {
        render(
            <FormControl caption={TEST_CAPTION} iconName="feather"/>, testContainer.getContainer()
        );
      });
    });

    afterAll(testContainer.disposeContainer);

    test("renders icon", () => testIconRender(true));

    test("renders caption", () => testCaptionRender(TEST_CAPTION));
  });

  test("renders addons", () => {
    const container = testContainer.createContainer();
    const FormControl = getFormControl(() => <input type="date"/>);
    act(() => {
      render(<FormControl caption={TEST_CAPTION}>
        <button/>
        <button/>
      </FormControl>, container);
    });
    expect(document.getElementsByClassName(ClassNames.ADD_ON).length).toBe(1);
  });

  describe("Partial render tests", () => {
    test("renders only icon", () => {
      const container = testContainer.createContainer("form");
      act(() => {
        const FormControl = getFormControl(() => <input type="text"/>);
        render(<FormControl iconName="feather"/>, container);
      });
      testIconRender(true);
      testCaptionRender(null);
      testContainer.disposeContainer();
    });

    test("renders only caption", () => {
      const container = testContainer.createContainer("form");
      act(() => {
        const FormControl = getFormControl(() => <input type="time"/>);
        render(<FormControl caption={TEST_CAPTION}/>, container);
      });
      testIconRender(false);
      testCaptionRender(TEST_CAPTION);
      testContainer.disposeContainer();
    });
  });

  function testIconRender(mustHaveIcon) {
    expect(document.getElementsByTagName("svg").length).toBe(mustHaveIcon ? 1 : 0);
  }

  function testCaptionRender(captionText) {
    const captionCount = captionText ? 1 : 0;
    const captions = document.getElementsByClassName(ClassNames.CAPTION);

    expect(captions.length).toBe(captionCount);
    if (captionCount > 0)
      expect(captions[0].textContent.includes(captionText)).toBeTruthy();
  }
});
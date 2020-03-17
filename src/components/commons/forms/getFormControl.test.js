import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import getFormControl, { ClassNames } from './getFormControl';
import TestContainer from '../../testHelpers/testContainer';
import { testIconRender } from "../../testHelpers/expectFunctions";

describe("getFormControl() tests", () => {
  const testContainer = new TestContainer();
  const TEST_CAPTION = "Test control";

  beforeEach(testContainer.createContainer);

  afterEach(testContainer.disposeContainer);

  describe("Basic render tests", () => {
    function renderFullFormControl() {
      const FormControl = getFormControl(() => <input type="number"/>);
      act(() => {
        render(
            <FormControl caption={TEST_CAPTION} iconName="feather"/>, testContainer.getContainer()
        );
      });
    }

    test("renders icon", () => {
      renderFullFormControl();
      testIconRender(1);
    });

    test("renders caption", () => {
      renderFullFormControl();
      testCaptionRender(TEST_CAPTION)
    });
  });

  test("renders addons", () => {
    const FormControl = getFormControl(() => <input type="date"/>);
    act(() => {
      render(<FormControl caption={TEST_CAPTION}>
        <button/>
        <button/>
      </FormControl>, testContainer.getContainer());
    });
    expect(document.getElementsByClassName(ClassNames.ADD_ON).length).toBe(1);
  });

  describe("Partial render tests", () => {
    test("renders only icon", () => {
      act(() => {
        const FormControl = getFormControl(() => <input type="text"/>);
        render(<FormControl iconName="feather"/>, testContainer.getContainer());
      });
      testIconRender(1);
      testCaptionRender(null);
    });

    test("renders only caption", () => {
      act(() => {
        const FormControl = getFormControl(() => <input type="time"/>);
        render(<FormControl caption={TEST_CAPTION}/>, testContainer.getContainer());
      });
      testIconRender(0);
      testCaptionRender(TEST_CAPTION);
    });
  });

  function testCaptionRender(captionText) {
    const captionCount = captionText ? 1 : 0;
    const captions = document.getElementsByClassName(ClassNames.CAPTION);

    expect(captions.length).toBe(captionCount);
    if (captionCount > 0)
      expect(captions[0].textContent.includes(captionText)).toBeTruthy();
  }
});
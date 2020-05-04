import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import FormControl, { ClassNames, Ids } from './formControl';
import TestContainer from '../../testHelpers/testContainer';
import { expectIconRender } from "../../testHelpers/expectFunctions";

describe("getFormControl() tests", () => {
  const testContainer = new TestContainer();
  const TEST_CAPTION = "Test control";
  const TEST_ID = "form-control-id";
  const TEST_HELP_ID = "form-control-help-id";
  const TEST_HELP = "Testing help element";

  beforeEach(testContainer.createContainer);

  afterEach(testContainer.disposeContainer);

  describe("Basic render tests", () => {
    function renderFullFormControl() {
      act(() => {
        render(
            <FormControl caption={TEST_CAPTION} iconName="feather"
                         inputElement={<input id={TEST_ID} type="number"/>}
                         helperElement={<span id={TEST_HELP_ID}>Help</span>}/>, testContainer.getContainer()
        );
      });
    }

    test("renders icon", () => {
      renderFullFormControl();
      expectIconRender(1);
    });

    test("renders caption", () => {
      renderFullFormControl();
      testCaptionRender(TEST_CAPTION)
    });

    test("renders help", () => {
      renderFullFormControl();
      const help = document.getElementById(TEST_HELP_ID);
      expect(help).not.toBeNull();
    })
  });

  test("renders addons", () => {
    act(() => {
      render(<FormControl caption={TEST_CAPTION} inputElement={<input type="date"/>}>
        <button/>
        <button/>
      </FormControl>, testContainer.getContainer());
    });
    expect(document.getElementsByClassName(ClassNames.ADD_ON).length).toBe(1);
  });

  describe("Partial render tests", () => {
    test("renders only icon", () => {
      act(() => {
        render(
            <FormControl iconName="feather" inputElement={<input type="text"/>}/>,
            testContainer.getContainer());
      });
      expectIconRender(1);
      testCaptionRender(null);
    });

    test("renders only caption", () => {
      act(() => {
        render(
            <FormControl caption={TEST_CAPTION} inputElement={<input type="time"/>}/>,
            testContainer.getContainer());
      });
      expectIconRender(0);
      testCaptionRender(TEST_CAPTION);
    });

    test("renders help without id", () => {
      act(() => {
        render(<FormControl caption={TEST_CAPTION} iconName="feather"
                            inputElement={<input type="text"/>} helperElement={<p>{TEST_HELP}</p>}
        />, testContainer.getContainer());
      });
      const helps = testContainer.getContainer().getElementsByClassName(ClassNames.HELP);
      expect(helps).toHaveLength(1);
      expect(helps[0].textContent).toBe(TEST_HELP);
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
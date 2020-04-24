import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import getFormControl, { ClassNames, Ids } from './getFormControl';
import TestContainer from '../../testHelpers/testContainer';
import { expectIconRender } from "../../testHelpers/expectFunctions";

describe("getFormControl() tests", () => {
  const testContainer = new TestContainer();
  const TEST_CAPTION = "Test control";
  const TEST_ID = "form-control-id";
  const TEST_HELP = "Testing help element";

  beforeEach(testContainer.createContainer);

  afterEach(testContainer.disposeContainer);

  describe("Basic render tests", () => {
    function renderFullFormControl() {
      const FormControl = getFormControl(
          () => <input type="number"/>, () => <span>Help</span>
      );
      act(() => {
        render(
            <FormControl id={TEST_ID} caption={TEST_CAPTION} iconName="feather" showHelp={true}/>, testContainer.getContainer()
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
      const help = document.getElementById(Ids.getHelpId(TEST_ID));
      expect(help).not.toBeNull();
    })
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
      expectIconRender(1);
      testCaptionRender(null);
    });

    test("renders only caption", () => {
      act(() => {
        const FormControl = getFormControl(() => <input type="time"/>);
        render(<FormControl caption={TEST_CAPTION}/>, testContainer.getContainer());
      });
      expectIconRender(0);
      testCaptionRender(TEST_CAPTION);
    });

    test("renders help without id", () => {
      act(() => {
        const FormControl = getFormControl(() => <input type="text"/>, () => <p>{TEST_HELP}</p>);
        render(<FormControl caption={TEST_CAPTION} iconName="feather" showHelp={true}/>, testContainer.getContainer());
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
import React from 'react';
import { render } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import FeatherInput from './featherInput';
import { ClassNames, Ids } from "./getFormControl";
import TestContainer from '../../testHelpers/testContainer';
import { expectIconRender, expectTextInClass } from "../../testHelpers/expectFunctions";

const TEST_ID = "feather-input-test-id";
const TEST_CAPTION = "Caption";
const TEST_PLACEHOLDER = "Placeholder";
const TEST_VALUE = "fnord";
const TEST_HELP = "Help";

describe("<FeatherInput> tests", () => {
  const testContainer = new TestContainer();
  const onChangeFunction = jest.fn();

  beforeAll(testContainer.createContainer);

  describe("Full input", () => {
    function renderFullInput() {
      act(() => {
        render(<>
              <FeatherInput id={TEST_ID} caption={TEST_CAPTION}
                            iconName="feather" placeholder={TEST_PLACEHOLDER}
                            value={TEST_VALUE} onChange={onChangeFunction}
                            helperComponent={() => <p>{TEST_HELP}</p>}
              >
              </FeatherInput>
              <input id="next-id"/>
            </>,
            testContainer.getContainer());
      });
    }

    test("shows icon", () => {
      renderFullInput();
      expectIconRender(1);
    });
    test("shows caption", () => {
      renderFullInput();
      expectTextInClass(ClassNames.CAPTION, TEST_CAPTION)
    });
    test("adds input element", () => {
      renderFullInput();
      const input = document.getElementById(TEST_ID);
      expect(input).not.toBeNull();
      expect(input.tagName).toBe("INPUT");
      expect(input.placeholder).toBe(TEST_PLACEHOLDER);
      expect(input.defaultValue).toBe(TEST_VALUE);
    });
    test("dispatches event onChange", () => {
      renderFullInput();
      const input = document.getElementById(TEST_ID);
      act(() => {
        input.value = "foobar";
        Simulate.change(input);
      });
      expect(onChangeFunction).toBeCalledTimes(1);
    });
    test("shows help text", () => {
      renderFullInput();
      const helpElements = testContainer.getContainer().getElementsByClassName(ClassNames.HELP);
      expect(helpElements).toHaveLength(1);
      const helpElement = document.getElementById(Ids.getHelpId(TEST_ID));
      expect(helpElement).not.toBeNull();
      expect(helpElement.textContent).toBe(TEST_HELP);
    });
  });

  describe("Inputs with missing props", () => {
    test("shows no icon", () => {
      act(() => {
        render(
            <FeatherInput caption={TEST_CAPTION} placeholder={TEST_PLACEHOLDER}/>,
            testContainer.getContainer());
      });
      expectIconRender(0);
    });

    test("shows no caption", () => {
      act(() => {
        render(
            <FeatherInput iconName="feather" placeholder={TEST_PLACEHOLDER}/>,
            testContainer.getContainer());
      });
      expect(testContainer.getContainer().getElementsByClassName(ClassNames.CAPTION).length).toBe(0);
    });

    test("shows no placeholder", () => {
      act(() => {
        render(
            <FeatherInput id={TEST_ID} iconName="feather" caption={TEST_CAPTION}/>,
            testContainer.getContainer());
      });
      expect(document.getElementById(TEST_ID).placeholder).toBeFalsy();
    });
  });

  afterAll(testContainer.disposeContainer);
});
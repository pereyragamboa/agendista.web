import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import getFormControl, { ClassNames } from './getFormControl';
import TestContainer from '../../testHelpers/testContainer';

describe("getFormControl() tests", () => {
  const testContainer = new TestContainer();
  const TEST_CAPTION = "Test control";


  describe("Full render tests", () => {
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

    test("renders icon", () => {
      expect(document.getElementsByTagName("svg").length).toBe(1);
    });

    test("renders caption", () => {
      const captions = document.getElementsByClassName(ClassNames.CAPTION);
      expect(captions.length).toBe(1);
      expect(captions[0].textContent.includes(TEST_CAPTION)).toBeTruthy();
    });
  });
});
import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import DeleteModal, { Ids } from './deleteModal';
import ClickEvent from '../../testHelpers/clickEvent';
import TestContainer from '../../testHelpers/testContainer';

describe("<DeleteModal> tests", () => {
  const testContainer = new TestContainer();

  describe("Modal buttons", () => {
    const ID = "test-modal";
    const mockDelete = jest.fn();

    beforeEach(() => {
      testContainer.createContainer();
      act(() => {
        render(<DeleteModal id={ID} delete={mockDelete}/>, testContainer.getContainer());
      });
    });

    afterEach(testContainer.disposeContainer);

    test("confirms modal", () => {
      const yesButton = document.getElementById(Ids.YES_BUTTON);
      yesButton.dispatchEvent(ClickEvent);
      expect(mockDelete).toHaveBeenCalled();
    });

    test("discards modal", () => {
      const noButton = document.getElementById(Ids.NO_BUTTON);
      noButton.dispatchEvent(ClickEvent);
      expect(document.getElementById(ID).classList.contains("is-active")).toBeFalsy();
    });
  });

  test("Modal with no ID", () => {
    testContainer.createContainer();
    expect(() => {
        render(<DeleteModal/>, testContainer.getContainer());
    }).toThrow();
    testContainer.disposeContainer();
  });
});
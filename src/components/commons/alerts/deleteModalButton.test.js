import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import DeleteModalButton from './deleteModalButton';
import ClickEvent from '../../testHelpers/clickEvent';
import TestContainer from '../../testHelpers/testContainer';

describe("<DeleteModalButton> tests", () => {
  const MODAL_ID = "fake-modal";


  test("shows modal", () => {
    const testContainer = new TestContainer();
    testContainer.createContainer();

    act(() => {
      render(<div>
        <DeleteModalButton modalId={MODAL_ID}/>
        <div id={MODAL_ID} className="modal"/>
      </div>, testContainer.getContainer())
    });

    testContainer.disposeContainer();
  });
});

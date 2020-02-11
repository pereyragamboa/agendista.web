import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import TestContainer from './testContainer';

describe("TestContainer tests", () => {
  it("creates and destroy a container", () => {
    const myContainer = TestContainer();
    myContainer.createContainer();
    const container = myContainer.getContainer();
    expect(container).not.toBe(null);
    expect(container.tagName).toBe("DIV");

    act(() => { render(<h1>Foo</h1>, container) });
    expect(container.textContent).toBe("Foo");

    myContainer.disposeContainer();
    expect(myContainer.getContainer()).toBe(null);
  });
});
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import TestContainer from './testContainer';

describe("TestContainer tests", () => {
  function createContainer() {
    const myContainer = TestContainer();
    myContainer.createContainer();
    return myContainer;
  }

  it("creates a container", () => {
    const myContainer = createContainer();
    const container = myContainer.getContainer();
    expect(container).not.toBe(null);
    expect(container.tagName).toBe("DIV");
  });

  it("creates a container with custom element", () => {
    const myContainer = new TestContainer();
    const elementName = "section";
    myContainer.createContainer(elementName);
    const container = myContainer.getContainer();
    expect(container.tagName).toBe(elementName.toUpperCase());
  });

  it("renders within the container", () => {
    const myContainer = createContainer();
    const container = myContainer.getContainer();
    act(() => { render(<h1>Foo</h1>, container) });
    expect(container.textContent).toBe("Foo");
  });

  it("destroys a container", () => {
    const myContainer = createContainer();
    myContainer.disposeContainer();
    expect(myContainer.getContainer()).toBe(null);
  });

  it("create two different containers", () => {
    const container1 = new TestContainer();
    const container2 = new TestContainer();

    container1.createContainer();
    expect(container2.getContainer()).toBeNull();
    expect(container1.getContainer()).not.toBe(container2.getContainer());
  });
});
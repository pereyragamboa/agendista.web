import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import listGraphQLErrors from './listGraphQLErrors';
import TestContainer from '../testHelpers/testContainer';

const mockMessages = [ "One", "Two", "Three" ];

const graphQLErrors = mockMessages.map(x => {
  return { message: x };
});

const networkError = { message: "Some network error "};

describe("listGraphQLErrors() test", () => {
  const container = new TestContainer();
  container.createContainer("div");

  it("shows GQL errors", () => {
    act(() => {
      render(<div>
        { listGraphQLErrors({ graphQLErrors })}
      </div>, container.getContainer());
    });
    const items = container.getContainer().getElementsByTagName("li");
    expect(items.length).toBe(graphQLErrors.length);
    mockMessages.forEach((message, index) =>
      expect(items[index].textContent).toBe(message)
    )
  });

  it("show network error", () => {
    act(() => {
      render(listGraphQLErrors({ networkError, graphQLErrors: [] }), container.getContainer());
    });
    expect(container.getContainer().getElementsByTagName("li").length).toBe(1);
    expect(container.getContainer().textContent).toBe(networkError.message);
  });

  it("shows all errors", () => {
    act(() => {
      render(listGraphQLErrors({ graphQLErrors, networkError }), container.getContainer());
    });
    expect(container.getContainer().getElementsByTagName("li").length).toBe(1 + graphQLErrors.length);
  });

  it("receives an invalid parameter", () => {
    expect(() => listGraphQLErrors(42)).toThrow()
  });
});
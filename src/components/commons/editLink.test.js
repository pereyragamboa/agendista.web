import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import EditLink from './editLink';
import ClickEvent from '../testHelpers/clickEvent';
import TestContainer from '../testHelpers/testContainer';

describe("<EditLink> tests", () => {
  let container = TestContainer();

  beforeEach(container.createContainer);

  test("renders edit link", () => {
    const EditLinkTest = () => <EditLink to="/example">Click me</EditLink>;
    const c = container.getContainer();
    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <Route path="/" component={EditLinkTest}/>
        </MemoryRouter>, c);
    });
    expect(c.textContent).toBe("Click me");
    const a = c.getElementsByTagName("a");
    expect(a.length).toBe(1);
    expect(a[0].pathname).toBe("/example");
  });

  test("renders icon", () => {
    act(() => {
      render(
          <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <Route path="/" component={() => <EditLink to="/x">X</EditLink>}/>
          </MemoryRouter>, container.getContainer());
    });
    const svg = container.getContainer().getElementsByTagName("svg");
    expect(svg.length).toBe(1);
    expect(svg[0].classList.contains("feather-edit-2"));
  });

  test("renders empty link", () => {
    const EditLinkTest = () => <EditLink to="/a"/>;
    act(() => {
      render(
          <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <Route path="/" component={EditLinkTest}/>
          </MemoryRouter>, container.getContainer());
    });
    expect(container.getContainer().textContent).toBe("");
  });

  test("goes to path", () => {
    act(() => {
      render(
          <MemoryRouter initialEntries={["/"]}>
            <Route path="/" exact={true} component={() => <EditLink to="/x">Next</EditLink>}/>
            <Route path="/x" exact={true} component={() => <p>X</p>}/>
          </MemoryRouter>, container.getContainer());
    });
    const a = container.getContainer().getElementsByTagName("a")[0];
    act(() => {
      a.dispatchEvent(ClickEvent);
    });
    expect(container.getContainer().textContent).toBe("X");
  });

  afterEach(container.disposeContainer);
});
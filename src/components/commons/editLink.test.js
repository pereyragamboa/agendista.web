import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import EditLink from './editLink';

describe("<EditLink> tests", () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  test("renders edit link", () => {
    const EditLinkTest = () => <EditLink to="/example">Click me</EditLink>;
    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <Route path="/" component={EditLinkTest}/>
        </MemoryRouter>, container);
    });
    expect(container.textContent).toBe("Click me");
    const a = container.getElementsByTagName("a");
    expect(a.length).toBe(1);
    expect(a[0].pathname).toBe("/example");
  });

  test("renders icon", () => {
    act(() => {
      render(
          <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <Route path="/" component={() => <EditLink to="/x">X</EditLink>}/>
          </MemoryRouter>, container);
    });
    const svg = container.getElementsByTagName("svg");
    expect(svg.length).toBe(1);
    expect(svg[0].classList.contains("feather-edit-2"));
  });

  test("renders empty link", () => {
    const EditLinkTest = () => <EditLink to="/a"/>;
    act(() => {
      render(
          <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <Route path="/" component={EditLinkTest}/>
          </MemoryRouter>, container);
    });
    expect(container.textContent).toBe("");
  });

  test("goes to path", () => {
    act(() => {
      render(
          <MemoryRouter initialEntries={["/"]}>
            <Route path="/" exact={true} component={() => <EditLink to="/x">Next</EditLink>}/>
            <Route path="/x" exact={true} component={() => <p>X</p>}/>
          </MemoryRouter>, container);
    });
    const a = container.getElementsByTagName("a")[0];
    act(() => {
      a.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    expect(container.textContent).toBe("X");
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
});
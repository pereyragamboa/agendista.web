import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { MemoryRouter, Route } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { GET_ALL_SERVICES } from "../../data/queries/serviceQueries";
import { expectLoadingPanel } from "../testHelpers/expectFunctions";
import TestContainer from '../testHelpers/testContainer';
import { getTimeString } from "../../utilities/times";
import { mockData } from "./mockData";
import ServiceList, { ClassNames, Ids } from './serviceList';

const mock = {
  request: {query: GET_ALL_SERVICES},
  result: {
    data: {
      getServices: mockData
    }
  }
};

const container = new TestContainer();

const listItems = new Map();

describe("Service list component tests", () => {
  beforeAll(async () => {
    container.createContainer();
    await act(async () => {
      render(
          <MockedProvider mocks={[mock]} addTypename={false}>
            <MemoryRouter initialIndex={0} initialEntries={["/"]}>
              <Route path={"/"} component={ServiceList}/>
            </MemoryRouter>
          </MockedProvider>, container.getContainer());
      await wait();
      mockData.forEach(({ id }) => {
        const item = document.getElementById(Ids.getListItemId(id));
        if (item) listItems.set(id, item);
      });
    });
  });

  afterAll(container.disposeContainer);

  test("Render component", () => {
    expectLoadingPanel(false);
    expect(document.getElementById(Ids.SERVICE_LIST)).not.toBeNull();
  });

  describe.each(mockData)("Display list items", mockService => {
    test(`Creates item for service ${mockService.id}`, () => {
      expect(listItems.get(mockService.id)).not.toBeNull();
    });

    test("Displays service name", () => {
      const item = listItems.get(mockService.id);
      expect(item).not.toBeNull();
      const names = item.getElementsByClassName(ClassNames.SERVICE_LIST_NAME_LABEL);
      expect(names).toHaveLength(1);
      expect(names[0].textContent).toBe(mockService.name);
    });

    test("Displays service time", () => {
      const item = listItems.get(mockService.id);
      expect(item).not.toBeNull();
      const times = item.getElementsByClassName(ClassNames.SERVICE_LIST_TIME_LABEL);
      expect(times).toHaveLength(1);
      expect(times[0].textContent).toBe(getTimeString(mockService.duration * 60 * 1000));
    });

    test("Displays service price", () => {
      const item = listItems.get(mockService.id);
      expect(item).not.toBeNull();
      const prices = item.getElementsByClassName(ClassNames.SERVICE_LIST_PRICE_LABEL);
      expect(prices).toHaveLength(1);
      expect(prices[0].textContent.includes(mockService.price.toString())).toBeTruthy();
    });
  });
});

import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import wait from 'waait';
import { GET_ALL_LEAVES } from "../../data/queries/leaveQueries";
import TestContainer from '../testHelpers/testContainer';
import LeavesIndex, { ClassNames, Ids } from './index';
import { Ids as IndexIds } from '../commons/getIndex';
import {expectLoadingPanel, expectTextInElement} from "../testHelpers/expectFunctions";
import { LEAVE } from "../../constants/headers";

describe("Leaves index component tests", () => {
  const container = new TestContainer();
  const listItems = new Map();

  const mockData = [
    {
      id: 336699,
      from: new Date(2020, 2, 1).toISOString(),
      to: new Date(2020, 2, 16).toISOString()
    },
    {
      id: 336688,
      from: new Date(2020, 5, 5).toISOString(),
      to: new Date(2020, 6, 6).toISOString()
    }
  ];

  const mockQuery = {
    request: { query: GET_ALL_LEAVES },
    result: {
      data: { getLeaves: mockData }
    }
  };

  beforeAll(async () => {
    await act(async () => {
      render(<MockedProvider mocks={[ mockQuery ]} addTypename={false}>
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <Route path={"/"} exact component={LeavesIndex}/>
        </MemoryRouter>
      </MockedProvider>, container.createContainer());
      await wait();
    });
    mockData.forEach(({ id }) => {
      const leaveItem = document.getElementById(Ids.getListItemId(id));
      if (leaveItem) listItems.set(id, leaveItem);
    });
  });

  afterAll(container.disposeContainer);

  test("Render component", () => {
    expectLoadingPanel(false);
    expect(document.getElementById(Ids.LEAVE_LIST)).not.toBeNull();
  });

  test("Has title", () => {
    expectTextInElement(IndexIds.NAVBAR_BRAND_TITLE, LEAVE);
  });

  test("Has icon", () => {
    expect(document.getElementById(IndexIds.NAVBAR_BRAND_ICON)).not.toBeNull();
  });

  test("Creates items for all data", () => {
    expect(document.getElementsByClassName(ClassNames.LEAVE_LIST_ITEM)).toHaveLength(mockData.length);
    expect(listItems.size).toBe(mockData.length);
  });

  describe.each(mockData)("Display list items", (mockItem) => {
    test(`Creates item for leave ${mockItem.id}`, () => {
      expect(listItems.get(mockItem.id)).not.toBeNull();
    });

    test("Shows leave start time", () => {
      const item = listItems.get(mockItem.id);
      expect(item).not.toBeNull();
      const from = item.getElementsByClassName(ClassNames.LEAVE_LIST_ITEM_FROM);
      expect(from).toHaveLength(1);
    });

    test("Shows leave end time", () => {
      const item = listItems.get(mockItem.id);
      expect(item).not.toBeNull();
      const to = item.getElementsByClassName(ClassNames.LEAVE_LIST_ITEM_TO);
      expect(to).toHaveLength(1);
    });

    test("Shows leave range (mobile)", () => {
      const item = listItems.get(mockItem.id);
      expect(item).not.toBeNull();
      const mobileText = item.getElementsByClassName(ClassNames.LEAVE_LIST_ITEM_MOBILE);
      expect(mobileText).toHaveLength(1);
    });
  });
});

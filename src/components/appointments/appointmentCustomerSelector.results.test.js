import { render } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import wait from 'waait';
import { mockData } from "../customers/mockData";
import { FIND_CUSTOMERS_BY_NAME } from "../../data/queries/customerQueries";
import { getMockProvider } from "../testHelpers/getMockProvider";
import TestContainer from '../testHelpers/testContainer';
import AppointmentCustomerSelector, { ClassNames, Ids, RUN_QUERY_TIMEOUT } from './appointmentCustomerSelector';
import { expectLoadingPanel } from "../testHelpers/expectFunctions";

const QUERY_PARAMETER = "123";

const mockQuery = {
  request: {
    query: FIND_CUSTOMERS_BY_NAME,
    variables: {
      names: [ QUERY_PARAMETER ]
    }
  },
  result: {
    data: {
      findCustomersByName: mockData
    }
  }
};

const container = new TestContainer();
const listMap = new Map();

describe("Tests for customer selector component with results", () => {
  beforeAll(async () => {
    await act(async () => {
      // Renders component
      render(
          getMockProvider(AppointmentCustomerSelector, {mockQueries: [ mockQuery ]}),
          container.createContainer());
      await wait();
      // Runs query
      const searchBox = document.getElementById(Ids.CUSTOMER_SELECTOR_SEARCH_BOX);
      if (searchBox) {
        searchBox.value = QUERY_PARAMETER;
        Simulate.change(searchBox);
        await wait(RUN_QUERY_TIMEOUT * 1.1); // Wait 10% longer than timeout for firing query
      }
      // Fills map with list items
      for(let mockItem of mockData) {
        const listItem = document.getElementById(Ids.getListItemId(mockItem.id));
        if (listItem) listMap.set(mockItem.id, listItem);
      }
    });
  });

  test("Renders list", async () => {
    expectLoadingPanel(false);
    expect(document.getElementById(Ids.CUSTOMER_SELECTOR)).not.toBeNull();
    expect(document.getElementById(Ids.CUSTOMER_SELECTOR_NO_RESULTS)).toBeNull();
  });

  test("Number of list elements is the same as number of elements in result", () => {
    const listItems = container.getContainer().getElementsByClassName(ClassNames.CUSTOMER_SELECTOR_ITEM);
    expect(listItems.length).toBe(mockData.length);
    expect(listItems).toHaveLength(listMap.size);
  });

  describe.each(mockData)("List element tests", (mockItem) => {
    test(`Creates element for id ${mockItem.id}`, () => {
      expect(listMap.has(mockItem.id)).toBeTruthy();
    });

    test(`Shows first name as ${mockItem.firstName}`, () => {
      const element = listMap.get(mockItem.id).getElementsByClassName(ClassNames.CUSTOMER_SELECTOR_ITEM_FIRST_NAME);
      expect(element).toHaveLength(1);
      expect(element[0].textContent).toEqual(mockItem.firstName);
    });

    test(`Shows last name as ${mockItem.lastName}`, () => {
      const element = listMap.get(mockItem.id).getElementsByClassName(ClassNames.CUSTOMER_SELECTOR_ITEM_LAST_NAME);
      expect(element).toHaveLength(1);
      expect(element[0].textContent).toEqual(mockItem.lastName);
    });

    test(`Shows email as ${mockItem.email}`, () => {
      const element = listMap.get(mockItem.id).getElementsByClassName(ClassNames.CUSTOMER_SELECTOR_ITEM_EMAIL);
      expect(element).toHaveLength(1);
      expect(element[0].textContent).toEqual(mockItem.email);
    });
  });

  test("Selects items", () => {
    const firstItem = listMap.get(mockData[0].id);
    const secondItem = listMap.get(mockData[1].id);
    const selectedItems = container.getContainer().getElementsByClassName(ClassNames.CUSTOMER_SELECTOR_ITEM_SELECTED);

    expect(selectedItems).toHaveLength(0);
    // Selects an item
    act(() => {
      Simulate.click(firstItem);
    });
    expect(selectedItems).toHaveLength(1);
    expect(firstItem.classList.contains(ClassNames.CUSTOMER_SELECTOR_ITEM_SELECTED)).toBeTruthy();
    // Selects other item by "clicking" on one of its children
    act(() => {
      Simulate.click(secondItem.children[0]);
    });
    expect(selectedItems).toHaveLength(1);
    expect(firstItem.classList.contains(ClassNames.CUSTOMER_SELECTOR_ITEM_SELECTED)).toBeFalsy();
    expect(secondItem.classList.contains(ClassNames.CUSTOMER_SELECTOR_ITEM_SELECTED)).toBeTruthy();
  });
});
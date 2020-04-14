import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { GET_ALL_CUSTOMERS } from "../../data/queries/customerQueries";
import { expectLoadingPanel } from "../testHelpers/expectFunctions";
import { getMockProvider } from "../testHelpers/getMockProvider";
import TestContainer from '../testHelpers/testContainer';
import CustomerList, { ClassNames, Ids } from './customerList';

const container = new TestContainer();

const mockData = [
  {
    id: 10241,
    firstName: "Adel",
    lastName: "Ortega",
    telephone: "12345321",
    email: "adel@bunsen.example.com"
  }, {
    id: 10242,
    firstName: "Arturo",
    lastName: "Navarra",
    telephone: "543212345",
    email: "sigurd@example.com"
  }, {
    id: 10243,
    firstName: "Claudia",
    lastName: "Bernal",
    telephone: "246808642",
    email: "mishxa_darksoul2000@hotmail.com"
  }
];

const mockQuery = {
  request: { query: GET_ALL_CUSTOMERS },
  result: { data: { getAllCustomers: mockData }}
};

describe("Customer list tests", () => {
  const customerMap = new Map();

  beforeAll(async () => {
    await act(async () => {
      render(
          getMockProvider(CustomerList, { mockQueries: [mockQuery] }),
          container.createContainer());
      await wait();

      mockData.forEach(({id}) => {
        const element = document.getElementById(Ids.getListItemId(id));
        if (element) customerMap.set(id, element);
      });
    });
  });

  afterAll(container.disposeContainer);

  test("Renders component", () => {
    expectLoadingPanel(false);
    expect(document.getElementById(Ids.CUSTOMER_LIST)).not.toBeNull();
  });

  test("Creates list items", () => {
    expect(mockData).toHaveLength(customerMap.size);
    expect(
        container.getContainer().getElementsByClassName(ClassNames.CUSTOMER_LIST_ITEM)
    ).toHaveLength(mockData.length);
  });

  describe.each(mockData)("List item tests", (mockCustomer) => {
    test(`Show first name as ${mockCustomer.firstName}`, () => {
      testElementContent(mockCustomer.id, ClassNames.CUSTOMER_LIST_FIRST_NAME, mockCustomer.firstName);
    });

    test(`Show last name as ${mockCustomer.lastName}`, () => {
      testElementContent(mockCustomer.id, ClassNames.CUSTOMER_LIST_LAST_NAME, mockCustomer.lastName);
    });

    test("Show full name", () => {
      testElementContent(
          mockCustomer.id, ClassNames.CUSTOMER_LIST_FULL_NAME,
          `${mockCustomer.firstName} ${mockCustomer.lastName}`
      );
    });

    test(`Show email as ${mockCustomer.email}`, () => {
      testElementContent(mockCustomer.id, ClassNames.CUSTOMER_LIST_EMAIL, mockCustomer.email);
    });

    test("Show telephone", () => {
      testElementContent(mockCustomer.id, ClassNames.CUSTOMER_LIST_TELEPHONE, mockCustomer.telephone);
    });
  });

  function testElementContent(customerId, className, text) {
    const elements = customerMap.get(customerId).getElementsByClassName(className);
    expect(elements).toHaveLength(1);
    expect(elements[0].textContent).toEqual(expect.stringContaining(text));
  }
});
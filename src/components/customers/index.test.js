import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { CUSTOMERS } from "../../constants/headers";
import { expectLoadingPanel } from "../testHelpers/expectFunctions";
import { getMockProvider } from '../testHelpers/getMockProvider';
import TestContainer from '../testHelpers/testContainer';
import { Ids as IndexIds } from '../commons/getIndex';
import { ClassNames, Ids } from './customerList';
import { mockData, mockQuery } from "./mockData";
import CustomerIndex from './index';

describe("Customer index component tests", () => {
  const container = new TestContainer();

  beforeAll(async () => {
    await act(async () => {
      render(
          getMockProvider(CustomerIndex, { mockQueries: [ mockQuery ] }),
          container.createContainer());
      await wait();
    });
  });

  test("Renders component", () => {
    expectLoadingPanel(false);
    expect(document.getElementById(Ids.CUSTOMER_LIST)).not.toBeNull();
  });

  test("Has title", () => {
    expect(document.getElementById(IndexIds.NAVBAR_BRAND_TITLE).textContent).toEqual(expect.stringContaining(CUSTOMERS));
  });

  test("Has icon", () => {
    expect(document.getElementById(IndexIds.NAVBAR_BRAND_ICON)).not.toBeNull();
  });

  test.each(mockData)(`Creates a list item for id`, ({ id }) => {
    expect(document.getElementById(Ids.getListItemId(id))).not.toBeNull();
  });
});
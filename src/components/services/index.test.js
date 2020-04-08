import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { expectLoadingPanel, expectTextInElement } from "../testHelpers/expectFunctions";
import TestContainer from '../testHelpers/testContainer';
import ServiceIndex from './index';
import { getMockProvider, mockData } from "./mockData";
import { Ids as ServiceIds } from './serviceList';
import { Ids as IndexIds } from '../commons/getIndex';
import { SERVICES } from "../../constants/headers";

describe("Service index component tests", () => {
  const testContainer = new TestContainer();

  beforeAll(async () => {
    await act(async () => {
      render(getMockProvider(ServiceIndex), testContainer.createContainer());
      await wait();
    });
  });

  afterAll(testContainer.disposeContainer);

  test("Render component", () => {
    expectLoadingPanel(false);
  });

  test("Has title", () =>
  {
    expectTextInElement(IndexIds.NAVBAR_BRAND_TITLE, SERVICES);
  });

  test("Has icon", () => {
    expect(document.getElementById(IndexIds.NAVBAR_BRAND_ICON)).not.toBeNull();
  });

  test("Has service list component", () => {
    expect(document.getElementById(ServiceIds.SERVICE_LIST)).not.toBeNull();
  });

  test.each(mockData.map(({ id }) => [ id ]))("Has service list item for ID %i", (id) => {
    expect(document.getElementById(ServiceIds.getListItemId(id))).not.toBeNull();
  });
});
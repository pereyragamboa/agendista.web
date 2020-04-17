import {render} from "react-dom";
import {act, Simulate} from "react-dom/test-utils";
import wait from "waait/index";
import {FIND_CUSTOMERS_BY_NAME} from "../../data/queries/customerQueries";
import {expectLoadingPanel} from "../testHelpers/expectFunctions";
import {getMockProvider} from "../testHelpers/getMockProvider";
import TestContainer from "../testHelpers/testContainer";
import AppointmentCustomerSelector, {Ids} from "./appointmentCustomerSelector";

const QUERY_PARAMETER = "fnord";

const emptyQuery = {
  request: {
    query: FIND_CUSTOMERS_BY_NAME,
    variables: {
      names: [QUERY_PARAMETER]
    }
  },
  result: { data: { findCustomersByName: [] } }
};

const container = new TestContainer();

describe("Tests for customer selector component with no results", () => {
  beforeAll(async () => {
    await act(async () => {
      render(
          getMockProvider(AppointmentCustomerSelector, {mockQueries: [ emptyQuery ]}),
          container.createContainer());
      await wait();
    });
  });

  test("Renders only search box", () => {
    expectLoadingPanel(false);
    expect(document.getElementById(Ids.CUSTOMER_SELECTOR)).toBeNull();
    expect(document.getElementById(Ids.CUSTOMER_SELECTOR_NO_RESULTS)).toBeNull();
    expect(document.getElementById(Ids.CUSTOMER_SELECTOR_SEARCH_BOX)).not.toBeNull();
  });

  test("Renders no results", async () => {
    const searchBox = document.getElementById(Ids.CUSTOMER_SELECTOR_SEARCH_BOX);
    await act(async () => {
      searchBox.value = QUERY_PARAMETER;
      Simulate.change(searchBox);
      await wait(1100);
    });
    expect(document.getElementById(Ids.CUSTOMER_SELECTOR)).toBeNull();
    expect(document.getElementById(Ids.CUSTOMER_SELECTOR_NO_RESULTS)).not.toBeNull();
  });

});

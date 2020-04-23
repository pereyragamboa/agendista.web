import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { GET_SETTINGS } from "../../data/queries/settingsQueries";
import { expectLoadingPanel } from '../testHelpers/expectFunctions';
import { getMockProvider } from "../testHelpers/getMockProvider";
import TestContainer from '../testHelpers/testContainer';
import Settings, { FieldIds } from './index';

const mock = {
  request: { query: GET_SETTINGS },
  result: {
    loading: false,
    data: {
      getProfile: {
        businessName: "Business",
        email: "business@example.com",
        telephone: "1234567890",
        url: "https://business.example.com"
      }
    }
  }
};

describe("Settings component render tests", () => {
  const container = new TestContainer();

  beforeAll(async () => {
    await act(async () => {
      render(
          getMockProvider(Settings, { mockQueries: [mock]}),
          container.createContainer());
    await wait();
    });
  });

  test.skip("Renders loading panel", () => {
    expectLoadingPanel(true);
  });

  test("Renders full component", async () => {
    const c = container.getContainer();
    expectLoadingPanel(false);
    // Must contain 7 SVG icons: title, 4 fields and 2 buttons
    expect(c.getElementsByTagName("svg").length).toBe(7);
    // Checks content of input fields
    const data = mock.result.data.getProfile;
    expect(document.getElementById(FieldIds.BUSINESS_FIELD).value).toBe(data.businessName);
    expect(document.getElementById(FieldIds.EMAIL_FIELD).value).toBe(data.email);
    expect(document.getElementById(FieldIds.PHONE_FIELD).value).toBe(data.telephone);
    expect(document.getElementById(FieldIds.WEBSITE_FIELD).value).toBe(data.url);
  });

  test.todo("Shows error on empty business name field");

  test.todo("Shows error on empty email field");

  test.todo("Shows error on empty phone field");

  test.todo("Updates settings")
});
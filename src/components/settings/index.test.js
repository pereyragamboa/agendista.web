import React from 'react';
import { render } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import wait from 'waait';
import {GET_SETTINGS, UPDATE_SETTINGS} from "../../data/queries/settingsQueries";
import { expectLoadingPanel } from '../testHelpers/expectFunctions';
import { changeField } from '../testHelpers/actFunctions';
import { getMockProvider } from "../testHelpers/getMockProvider";
import TestContainer from '../testHelpers/testContainer';
import Settings, { Ids } from './index';
import { Ids as DetailIds } from '../commons/detail';
import { SAVING_PANEL_ID } from "../commons/alerts/savingPanel";

const mockQuery = {
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

const mockMutation = {
  request: {
    query: UPDATE_SETTINGS,
    variables: {
      businessName: "New business",
      url: "",
      email: "new.business@example.com",
      telephone: "0987654321"
    },
    result: { data: { id: 1 }}
  }
};

const emails = [
    ["", false],
    ["abc", false],
    ["io@example.io", true]
];

const urls = [
    ["", true],
    ["foo.bar", false],
    ["www.example.fm", false],
    ["http://localhost.com", true]
];

describe("Settings component render tests", () => {
  const container = new TestContainer();

  beforeAll(async () => {
    await act(async () => {
      render(
          getMockProvider(Settings, { mockQueries: [mockQuery, mockMutation]}),
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
    const data = mockQuery.result.data.getProfile;
    expect(document.getElementById(Ids.BUSINESS_FIELD).value).toBe(data.businessName);
    expect(document.getElementById(Ids.EMAIL_FIELD).value).toBe(data.email);
    expect(document.getElementById(Ids.PHONE_FIELD).value).toBe(data.telephone);
    expect(document.getElementById(Ids.WEBSITE_FIELD).value).toBe(data.url);
  });

  test("Shows error on empty business name field", async () => {
    await changeField(Ids.BUSINESS_FIELD, "");
    expect(document.getElementById(Ids.BUSINESS_FIELD_HELPER)).not.toBeNull();
  });

  test.each(emails)("Shows error on invalid email field", async (email, isValid) => {
    await changeField(Ids.EMAIL_FIELD, email);
    expect(document.getElementById(Ids.EMAIL_FIELD_HELPER) === null).toBe(isValid);
  });

  test("Shows error on empty phone field", async() => {
    await changeField(Ids.PHONE_FIELD, "");
    expect(document.getElementById(Ids.PHONE_FIELD_HELPER)).not.toBeNull();
  });

  test.each(urls)("Shows error on invalid website field", async (url, isValid) => {
    await changeField(Ids.WEBSITE_FIELD, url);
    expect(document.getElementById(Ids.WEBSITE_FIELD_HELPER) === null).toBe(isValid);
  });

  test.skip("Updates profile", async () => {
    const button = document.getElementById(DetailIds.OK_BUTTON);
    await act(async () => {
      await changeField(Ids.BUSINESS_FIELD, mockMutation.request.variables.businessName);
      await Simulate.click(button);
    });
    //expect(document.getElementById(SAVING_PANEL_ID)).not.toBeNull();
    expect(document.getElementById(Ids.CONFIRMATION_MESSAGE)).not.toBeNull();
  });
});
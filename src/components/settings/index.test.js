import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { GET_SETTINGS } from "../../data/queries/settingsQueries";
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
  let fullRender = null;

  beforeAll(() => {
    act(() => {
      render(fullRender = <MockedProvider mocks={[mock]} addTypename={false}>
        <Settings/>
      </MockedProvider>, container.createContainer());
    });
  });

  test("Renders loading panel", () => {
    expect(container.getContainer().textContent).toContain("Buscando");
  });
  test("Renders full component", async () => {
    await act(async () =>
      await new Promise(resolve => setTimeout(resolve, 1000))
    );
    const c = container.getContainer();
    // Must contain 7 SVG icons: title, 4 fields and 2 buttons
    expect(c.getElementsByTagName("svg").length).toBe(7);
    // Checks content of input fields
    const data = mock.result.data.getProfile;
    expect(document.getElementById(FieldIds.BUSINESS_FIELD).value).toBe(data.businessName);
    expect(document.getElementById(FieldIds.EMAIL_FIELD).value).toBe(data.email);
    expect(document.getElementById(FieldIds.PHONE_FIELD).value).toBe(data.telephone);
    expect(document.getElementById(FieldIds.WEBSITE_FIELD).value).toBe(data.url);
  });
});
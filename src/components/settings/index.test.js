import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import renderer from 'react-test-renderer';
import { GET_SETTINGS } from "../../data/queries/settingsQueries";
import Settings from './index';

const mocks = [
  {
    request: { query: GET_SETTINGS },
    result: {
      data: {
        getProfile: {
          businessName: "Business",
          email: "business@example.com",
          telephone: "1234567890",
          url: "https://business.example.com"
        }
      }
    }
  }
];

describe("Settings component render tests", () => {
  test("Renders correctly", () => {
    renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Settings/>
    </MockedProvider>);
  })
});
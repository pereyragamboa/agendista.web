import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import {GET_ALL_SERVICES} from "../../data/queries/serviceQueries";
import ServiceList from "./serviceList";

/**
 * Mock data for testing.
 * @type {*[]}
 */
export const mockData = [
  {
    id: 42001,
    name: "Test service",
    description: "Performs tests",
    duration: 45,
    price: 100
  }, {
    id: 42002,
    name: "Mock service",
    description: "Does nothing",
    duration: 15,
    price: 400
  }
];

const mockQuery = {
  request: {query: GET_ALL_SERVICES},
  result: {
    data: {
      getServices: mockData
    }
  }
};

/**
 * Higher-order component creating a mock environment for service components.
 * @param component A component consuming GET_ALL_SERVICES.
 * @return {*}
 */
export const getMockProvider = (component) => <MockedProvider mocks={[mockQuery]} addTypename={false}>
  <MemoryRouter initialIndex={0} initialEntries={["/"]}>
    <Route path={"/"} component={component}/>
  </MemoryRouter>
</MockedProvider>;
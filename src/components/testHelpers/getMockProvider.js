import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';

/**
 * Higher-order component creating a mock environment for service components.
 * @param component A component consuming the specified query result.
 * @param mockQueries Array of mock query objects for configuring the mock provider.
 * @param bool addTypename Indicates that mock queries should provide a __typename
 * member in their result objects.
 * @return {*}
 */
export const getMockProvider = (component, { mockQueries, addTypename = false }) =>
    <MockedProvider mocks={mockQueries} addTypename={addTypename}>
      <MemoryRouter initialIndex={0} initialEntries={["/"]}>
        <Route path={"/"} component={component}/>
      </MemoryRouter>
    </MockedProvider>;
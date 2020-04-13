import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import wait from 'waait';
import { Ids as IndexIds } from '../commons/getIndex';
import { HOLIDAYS } from "../../constants/headers";
import {GET_ALL_HOLIDAYS} from "../../data/queries/holidayQueries";
import introspectionQueryResultData from '../../fragmentTypes';
import { expectLoadingPanel, expectTextInElement } from "../testHelpers/expectFunctions";
import TestContainer from "../testHelpers/testContainer";
import HolidayIndex, { ClassNames, Ids } from './index';

describe("Holiday index component tests", () => {
  const testContainer = new TestContainer();

  const mockData = [
    {
      __typename: "FixedHoliday",
      id: "2561",
      month: 'JUNE',
      day: 15
    }, {
      __typename: "VariableHoliday",
      id: "2562",
      month: 'SEPTEMBER',
      dayOfWeek: 'MONDAY',
      week: 2
    }, {
      __typename: "FixedHoliday",
      id: "2563",
      month: "NOVEMBER",
      day: 18
    }, {
      __typename: "VariableHoliday",
      id: "2564",
      month: "APRIL",
      week: 3,
      dayOfWeek: 'FRIDAY'
    }
  ];

  const mock = {
    request: { query: GET_ALL_HOLIDAYS },
    result: { data: { getHolidays: mockData } }
  };

  beforeAll(async () => {
    await act(async() => {
      // Required for MockedProvider to resolve types
      const cache = new InMemoryCache({
        fragmentMatcher: new IntrospectionFragmentMatcher({
          introspectionQueryResultData
        })
      });

      render(<MockedProvider mocks={[ mock ]} addTypename={true} cache={cache}>
        <MemoryRouter initialIndex={0} initialEntries={["/"]}>
          <Route path={"/"} exact={true} component={HolidayIndex}/>
        </MemoryRouter>
      </MockedProvider>, testContainer.createContainer());
      await wait();
    });
  });

  test("Render component", () => {
    expectLoadingPanel(false);
    expect(document.getElementById(Ids.HOLIDAY_LIST)).not.toBeNull();
  });

  test("Has title", () => {
    expectTextInElement(IndexIds.NAVBAR_BRAND_TITLE, HOLIDAYS);
  });

  test("Has icon", () => {
    expect(document.getElementById(IndexIds.NAVBAR_BRAND_ICON)).not.toBeNull();
  });

  test.todo("Has holiday items");
});
import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';
import BusinessHours, { ClassNames, DefaultValues } from './index';
import { GET_BUSINESS_HOURS, BusinessDays } from "../../data/queries/businessHoursQueries";
import { expectLoadingPanel } from "../testHelpers/expectFunctions";
import TestContainer from '../testHelpers/testContainer';

const weekdayHours = {
  id: "1231",
  day: BusinessDays.WEEKDAYS,
  startTime: "08:00",
  endTime: "18:00"
};

const saturdayHours = {
  id: "1232",
  day: BusinessDays.SATURDAY,
  startTime: "10:00",
  endTime: "20:00"
};

const sundayHours = {
  id: "1233",
  day: BusinessDays.SUNDAY,
  startTime: "12:00",
  endTime: "14:00"
};

const getMock = (mockData) => { return {
  request: { query: GET_BUSINESS_HOURS },
  result: {
    data: {
      getBusinessHours: mockData
    }
  }
}};

const fullWeek = [ weekdayHours, saturdayHours, sundayHours ];

const weekdaysOnly = [ weekdayHours ];

const testContainer = new TestContainer();

describe("Business hour component tests", () => {
  describe.each([
      [fullWeek],
      [weekdaysOnly]
  ])("Render tests", (mockData) => {
    let hoursMap = null; // Map for easier assertions
    let hourListItemsMap = null;

    beforeAll(async () => {
      testContainer.createContainer();
      await act(async () => {
        render(
            <MockedProvider mocks={[ getMock(mockData) ]} addTypename={false}>
              <BusinessHours/>
            </MockedProvider>, testContainer.getContainer());
        await wait();

        // Fills maps
        hoursMap = new Map(mockData.map(({ day, ...rest }) => [day, rest]));

        hourListItemsMap = [];
        const hourListItems = testContainer.getContainer().getElementsByClassName(ClassNames.HOUR_LIST_ITEM);
        for(let hourListItem of hourListItems) {
          const fromField = hourListItem.getElementsByClassName(ClassNames.HOUR_LIST_FROM_FIELD)[0];
          const toField = hourListItem.getElementsByClassName(ClassNames.HOUR_LIST_TO_FIELD)[0];
          const dayField = hourListItem.getElementsByClassName(ClassNames.HOUR_LIST_DAY_FIELD)[0];
          if (dayField) {
            hourListItemsMap.push({ day: dayField.value, fromField, toField, dayField });
          }
        }
      });
    });

    afterAll(testContainer.disposeContainer);

    test.skip("Renders loading panel", () => {
      expectLoadingPanel(true);
    });

    test("Renders component", async () => {
      expectLoadingPanel(false);
      // Checks that hour list items are created
      expect(hourListItemsMap.length).toBe(3);
    });

    test(`Checks ${mockData.length} hour item(s)`, () => {
      // Checks that hour list items are checked
      hourListItemsMap.forEach(({ day, dayField }) =>
          expect(hoursMap.has(day)).toBe(dayField.checked === true)
      );
    });

    test("Loads start (from) time", () => {
      hourListItemsMap.forEach(({ fromField, day }) =>
          expect(fromField.defaultValue).toBe(
              hoursMap.has(day) ? hoursMap.get(day).startTime : DefaultValues.FROM_TIME
          )
      );
    });

    test("Loads end (to) time", () => {
      hourListItemsMap.forEach(({ toField, day }) =>
        expect(toField.defaultValue).toBe(
            hoursMap.has(day) ? hoursMap.get(day).endTime : DefaultValues.TO_TIME
        )
      )
    });
  });
});
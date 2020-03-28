import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import BusinessHours from './index';
import { GET_BUSINESS_HOURS, BusinessDays } from "../../data/queries/businessHoursQueries";
import TestContainer from '../testHelpers/testContainer';

const mock = {
  request: { query: GET_BUSINESS_HOURS },
  result: {
    loading: true,
    data: {
      getBusinessHours: [
        {
          id: "1231",
          day: BusinessDays.WEEKDAYS,
          startTime: "08:00",
          endTime: "18:00"
        }, {
          id: "1232",
          day: BusinessDays.SATURDAY,
          startTime: "10:00",
          endTime: "20:00"
        }, {
          id: "1233",
          day: BusinessDays.SUNDAY,
          startTime: "12:00",
          endTime: "14:00"
        }
      ]
    }
  }
};

const testContainer = new TestContainer();

describe("Business hour component tests", () => {
  beforeEach(testContainer.createContainer);

  afterEach(testContainer.disposeContainer);

  describe("Render tests", () => {
    const renderDefault = () => {
      act(() => {
        render(<MockedProvider mocks={[mock]} addType={false}>
          <BusinessHours/>
        </MockedProvider>, testContainer.getContainer());
      });
    };

    test("Renders loading panel", () => {
      renderDefault();
      expect(testContainer.getContainer().textContent).toContain("Buscando");
    });
  });
});
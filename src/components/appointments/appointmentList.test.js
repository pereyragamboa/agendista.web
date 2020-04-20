import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { GET_PROFILE_APPOINTMENTS } from "../../data/queries/appointmentQueries";
import { getMockProvider } from "../testHelpers/getMockProvider";
import TestContainer from '../testHelpers/testContainer';
import AppointmentList, { ClassNames, Ids } from "./appointmentList";
import { mockData as mockCustomers } from '../customers/mockData';
import { expectLoadingPanel } from "../testHelpers/expectFunctions";

describe("Appointment list component tests", () => {
  const container = new TestContainer();
  const itemMap = new Map();

  function getRandomInteger(ceiling) { return Math.floor(Math.random() * ceiling); }

  function getMockData(count) {
    if (typeof(count) === 'number' && count > 0) {
      const res = [];
      let id = getRandomInteger(1024);

      for(let i = 0; i < count; i++) {
        res.push({
          id: id++,
          date: new Date(
              2020, getRandomInteger(12), getRandomInteger(30) + 1,
              getRandomInteger(24), getRandomInteger(60)),
          customer: mockCustomers[getRandomInteger(mockCustomers.length)]
        });
      }

      return res;
    }
    else throw new Error("Invalid count.");
  }

  const mockData = getMockData(5);

  const mockQuery = {
    request: { query: GET_PROFILE_APPOINTMENTS },
    result: { data: { getProfileAppointments: mockData }}
  };

  beforeAll(async () => {
    await act(async () => {
      render(getMockProvider(AppointmentList, { mockQueries: [ mockQuery ] }), container.createContainer());
      await wait();
    });

    mockData.forEach(({ id }) => {
      const item = document.getElementById(Ids.getListItemId(id));
      if (item) {
        itemMap.set(id, item);
      }
    });
  });

  afterAll(container.disposeContainer);

  test("Creates appointment list", () => {
    expectLoadingPanel(false);
    expect(
        container.getContainer().getElementsByClassName(ClassNames.APPOINTMENT_LIST)
    ).toHaveLength(1);
  });

  test("Creates list items", () => {
    const listItems = container.getContainer().getElementsByClassName(ClassNames.APPOINTMENT_LIST_ITEM);
    expect(listItems).toHaveLength(mockData.length);
    expect(itemMap.size).toEqual(mockData.length);
  });

  describe.each(mockData)("List item tests", (mockAppointment) => {
    test(`Create items for id=${mockAppointment.id}`, () => {
      expect(itemMap.has(mockAppointment.id)).toBeTruthy();
    });

    test(`Shows appointment date and time as ${mockAppointment.date}`, () => {
      const elements =
          itemMap.get(mockAppointment.id).getElementsByClassName(ClassNames.APPOINTMENT_LIST_ITEM_DATE_TIME)
      expect(elements).toHaveLength(1);
      expect(elements[0].textContent).toEqual(mockAppointment.date.toLocaleString());
    });

    test("Shows customer name", () => {
      const elements =
          itemMap.get(mockAppointment.id).getElementsByClassName(ClassNames.APPOINTMENT_LIST_ITEM_CUSTOMER);
      expect(elements[0].textContent).toEqual(expect.stringContaining(mockAppointment.customer.firstName));
      expect(elements[0].textContent).toEqual(expect.stringContaining(mockAppointment.customer.lastName));
    });
  });
});
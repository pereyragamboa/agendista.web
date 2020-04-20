import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { expectLoadingPanel } from "../testHelpers/expectFunctions";
import { getMockProvider } from "../testHelpers/getMockProvider";
import TestContainer from '../testHelpers/testContainer';
import AppointmentList, { ClassNames, Ids } from "./appointmentList";
import { mockData, mockQuery } from './mockData';

describe("Appointment list component tests", () => {
  const container = new TestContainer();
  const itemMap = new Map();

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
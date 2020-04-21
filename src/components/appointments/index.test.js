import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { getMockProvider } from "../testHelpers/getMockProvider";
import TestContainer from '../testHelpers/testContainer';
import AppointmentIndex from './index';
import { ClassNames, Ids } from './appointmentList';
import { mockData, mockQuery } from "./mockData";
import {expectLoadingPanel} from "../testHelpers/expectFunctions";
import { Ids as NavbarIds } from '../commons/getIndex';
import { APPOINTMENTS } from '../../constants/headers';

describe("Appointment index tests", () => {
  const container = new TestContainer();

  beforeAll(async() => {
    await act(async () => {
      render(getMockProvider(AppointmentIndex, { mockQueries: [ mockQuery ] }), container.createContainer());
      await wait();
    });
  });

  afterAll(container.disposeContainer);

  test("Renders component", () => {
    expectLoadingPanel(false);
    expect(container.getContainer().getElementsByClassName(ClassNames.APPOINTMENT_LIST)).toHaveLength(1);
  });

  test("Has title", () => {
    const element = document.getElementById(NavbarIds.NAVBAR_BRAND_TITLE);
    expect(element).not.toBeNull();
    expect(element.textContent).toEqual(APPOINTMENTS);
  });

  test("Has icon", () => {
    const element = document.getElementById(NavbarIds.NAVBAR_BRAND_ICON);
    expect(element).not.toBeNull();
  });

  test.each(mockData)("Creates a list item for id %s", (mockAppointment) => {
    expect(document.getElementById(Ids.getListItemId(mockAppointment.id)));
  });
});
import { GET_PROFILE_APPOINTMENTS } from "../../data/queries/appointmentQueries";
import { mockData as mockCustomers } from "../customers/mockData";

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
            getRandomInteger(24), getRandomInteger(6) * 10),
        customer: mockCustomers[getRandomInteger(mockCustomers.length)]
      });
    }

    return res;
  }
  else throw new Error("Invalid count.");
}

export const mockData = getMockData(5);

export const mockQuery = {
  request: { query: GET_PROFILE_APPOINTMENTS },
  result: { data: { getProfileAppointments: mockData }}
};
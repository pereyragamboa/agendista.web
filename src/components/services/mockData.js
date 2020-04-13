import {GET_ALL_SERVICES} from "../../data/queries/serviceQueries";

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

export const mockQuery = {
  request: {query: GET_ALL_SERVICES},
  result: {
    data: {
      getServices: mockData
    }
  }
};
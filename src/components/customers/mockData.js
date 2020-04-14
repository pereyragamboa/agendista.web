import {GET_ALL_CUSTOMERS} from "../../data/queries/customerQueries";

export const mockData = [
  {
    id: 10241,
    firstName: "Adel",
    lastName: "Ortega",
    telephone: "12345321",
    email: "adel@bunsen.example.com"
  }, {
    id: 10242,
    firstName: "Arturo",
    lastName: "Navarra",
    telephone: "543212345",
    email: "sigurd@example.com"
  }, {
    id: 10243,
    firstName: "Claudia",
    lastName: "Bernal",
    telephone: "246808642",
    email: "mishxa_darksoul2000@hotmail.com"
  }
];

export const mockQuery = {
  request: { query: GET_ALL_CUSTOMERS },
  result: { data: { getAllCustomers: mockData }}
};

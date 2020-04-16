import gql from 'graphql-tag';

export const FIND_CUSTOMERS_BY_NAME = gql`
    query findCustomers($names: [String]) {
        findCustomersByName(names: $names) {
            id
            firstName
            lastName
            email
        }
    }`;

export const GET_ALL_CUSTOMERS = gql`{
    getAllCustomers {
        id
        firstName
        lastName
        telephone
        email
    }}`;

export const GET_CUSTOMER = gql`{
    getCustomer(clientId: $customerId) @client {
        firstName
        lastName
        telephone
        email
    }
}`;
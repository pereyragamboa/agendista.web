import gql from 'graphql-tag';

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
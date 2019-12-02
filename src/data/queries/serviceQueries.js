import gql from 'graphql-tag';

export const GET_ALL_SERVICES = gql`  
  query {
    getServices(profileId: $id) {
      name
      description
      duration
      price
  }}
`;

export const GET_SERVICE = gql`
  query {
    getService(serviceId: $id) @client {
      name
      description
      duration
      price
  }}
`;
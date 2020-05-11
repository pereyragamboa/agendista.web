import gql from 'graphql-tag';

export const GET_ALL_SERVICES = gql`query {
    getServices(profileId: "0x30001") {
        id
        name
        description
        duration
        price
    }
}`;

export const GET_SERVICE = gql`query {
    getService(serviceId: $id) @client {
        name
        description
        duration
        price
    }
}`;

export const ADD_SERVICE = gql`mutation ($name: String!, $description: String!, $duration: Int!, $price: Float!) {
    addService(
        profileId: "0x30001",
        newService: {
            name: $name
            description: $description
            duration: $duration
            price: $price
        }
    ) { id }
}`;

export const UPDATE_SERVICE = gql`mutation (
        $id: ID!, $name: String!, $description: String!, $duration: Int!, $price: Float!) {
    updateService(
        serviceId: $id
        service: {
            name: $name
            description: $description
            duration: $duration
            price: $price
        }
    ) { id }
}`;
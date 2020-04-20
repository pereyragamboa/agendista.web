import gql from 'graphql-tag';

export const GET_PROFILE_APPOINTMENTS = gql`
    query { getProfileAppointments (profileId: "0x30001") {
        id
        date
        customer {
            firstName
            lastName
        }
    }}`;
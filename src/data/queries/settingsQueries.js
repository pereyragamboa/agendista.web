import gql from 'graphql-tag';

export const GET_SETTINGS = gql`
    query { getProfile(profileId: "0x30001") {
        businessName
        email
        telephone
        url
    }}
`;
import gql from 'graphql-tag';

export const GET_SETTINGS = gql`
    query { getProfile(profileId: "0x30001") {
        businessName
        email
        telephone
        url
    }}
`;

export const UPDATE_SETTINGS = gql`
  mutation updateProfile($businessName: String!, $url: String, $email: String, $telephone: String!) { 
      updateProfile(
          profileId: "0x30001"
          profile: {
              businessName: $businessName
              url: $url
              email: $email
              telephone: $telephone
          }
      ) {
          id
      }}
`;
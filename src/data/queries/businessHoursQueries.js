import gql from 'graphql-tag';

export const GET_BUSINESS_HOURS = gql`{ 
    getBusinessHours (profileId: "0x30001") {
        id
        day
        startTime
        endTime
    }}
`;

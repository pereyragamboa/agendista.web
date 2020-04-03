import gql from 'graphql-tag';

export const GET_BUSINESS_HOURS = gql`
    query { getBusinessHours (profileId: "0x30001") {
        id
        day
        startTime
        endTime
    }}
`;

export const BusinessDays = {
  WEEKDAYS: "WEEKDAYS",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY"
};
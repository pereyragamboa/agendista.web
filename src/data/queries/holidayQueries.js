import gql from 'graphql-tag';

export const GET_ALL_HOLIDAYS = gql`{
    getHolidays(profileId: "0x30001") {
        id
        month
        ...on FixedHoliday {
            day
        }
        ...on VariableHoliday {
            dayOfWeek
            week
        }
    }
}`;

export const GET_HOLIDAY = gql`{
    getHoliday (holidayId: $id) @client {
        id
        month
        ...on FixedHoliday {
            day
        }
        ...on VariableHoliday {
            week
            dayOfWeek
        }
    }
}`;

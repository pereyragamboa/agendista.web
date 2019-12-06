import gql from 'graphql-tag';

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

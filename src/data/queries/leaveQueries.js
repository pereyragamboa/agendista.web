import gql from 'graphql-tag';

export const GET_LEAVE = gql`{
    getLeave(leaveId: $id) @client {
        id
        from
        to
    }
}`;
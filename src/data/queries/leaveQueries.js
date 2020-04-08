import gql from 'graphql-tag';

export const GET_ALL_LEAVES = gql`
    query { getLeaves(profileId: "0x30001") {
        id
        from
        to
    }}`;

export const GET_LEAVE = gql`{
    getLeave(leaveId: $id) @client {
        id
        from
        to
    }
}`;
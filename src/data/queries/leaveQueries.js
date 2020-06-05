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

export const ADD_LEAVE = gql`
    mutation ($from: Date!, $to: Date!) { addLeave (
        profileId: "0x30001"
        leave: {
            from: $from,
            to: $to
        }
    ) { id }
}`;

export const UPDATE_LEAVE = gql`
    mutation ($id: ID!, $from: Date!, $to: Date!) { updateLeave (
        leaveId: $id
        leave: {
            from: $from,
            to: $to
        }
    )}
`;
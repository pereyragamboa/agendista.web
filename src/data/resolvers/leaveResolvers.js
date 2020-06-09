import { GET_ALL_LEAVES } from "../queries/leaveQueries";

export default {
  Query: {
    getLeave(root, {leaveId}, {cache, getCacheKey}) {
      const key = getCacheKey({ __typename: "Leave", id: leaveId });
      return cache ? cache.data.get(key) : { id: leaveId };
    }
  }
}

export function updateAfterAdd(cache, { data: { addLeave }}) {
  const { getLeaves } = cache.readQuery({ query: GET_ALL_LEAVES });
  cache.writeQuery({
    query: GET_ALL_LEAVES,
    data: { getLeaves: getLeaves.concat([ addLeave ]) }
  });
}
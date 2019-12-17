export default {
  Query: {
    getLeave(root, {leaveId}, {cache, getCacheKey}) {
      const key = getCacheKey({ __typename: "Leave", id: leaveId });
      return cache ? cache.data.get(key) : { id: leaveId };
    }
  }
}
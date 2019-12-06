export default {
  Query: {
    getHoliday: (root, { holidayId }, { cache, getCacheKey }) => {
      // Create all possible keys
      const keys = ["FixedHoliday", "VariableHoliday"].map(
          typeName => getCacheKey({__typename: typeName, id: holidayId})
      );
      if (cache.data) {
        // Get first key that gets data
        return keys.map(k => cache.data.get(k)).find(d => d !== undefined);
      }
      return { id: holidayId };
    }
  }
}

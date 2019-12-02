export default {
  Query: {
    getCustomer: (root, {clientId}, {cache, getCacheKey}) => {
      const key = getCacheKey({__typename: "Customer", id: clientId});
      return cache.data ? cache.data.get(key) : {
        id: clientId,
        firstName: "", lastName: "", telephone: "", email: ""
      };
    }
  }
};


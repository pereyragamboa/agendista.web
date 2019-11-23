export default {
  Query: {
    getCustomer: (root, {clientId}, {cache, getCacheKey}) => {
      console.log(`clientId = ${clientId}`);
      const key = getCacheKey({__typename: "Customer", id: clientId});
      console.log(`key = ${key}`);
      console.log(cache.data);
      return cache.data ? cache.data.get(key) : {
        id: clientId,
        firstName: "", lastName: "", telephone: "", email: ""
      };
    }
  }
};


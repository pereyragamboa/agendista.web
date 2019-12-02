export default {
  Query: {
    getService: (root, {serviceId}, {cache, getCacheKey}) => {
      const key = getCacheKey({__typename: "Service", id: serviceId});
      return cache.data ? cache.data.get(key) : { serviceId };
    }
  }
};
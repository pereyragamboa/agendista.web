import { GET_ALL_SERVICES } from '../queries/serviceQueries'

export default {
  Query: {
    getService: (root, {serviceId}, {cache, getCacheKey}) => {
      const key = getCacheKey({__typename: "Service", id: serviceId});
      return cache.data ? cache.data.get(key) : { serviceId };
    }
  }
};

export function update (cache, { data: { addService }}) {
  const { getServices } = cache.readQuery({ query: GET_ALL_SERVICES });
  cache.writeQuery({
    query: GET_ALL_SERVICES,
    data: { getServices: getServices.concat([addService]) }
  });
}
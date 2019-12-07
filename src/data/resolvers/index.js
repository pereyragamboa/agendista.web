import CustomerResolvers from './customerResolvers';
import HolidayResolvers from './holidayResolvers';
import ServiceResolvers from './serviceResolvers';

export default {
  Query: {
    ...CustomerResolvers.Query,
    ...HolidayResolvers.Query,
    ...ServiceResolvers.Query
  }
}
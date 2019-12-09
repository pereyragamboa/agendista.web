import CustomerResolvers from './customerResolvers';
import HolidayResolvers from './holidayResolvers';
import LeaveResolvers from './leaveResolvers';
import ServiceResolvers from './serviceResolvers';

export default {
  Query: {
    ...CustomerResolvers.Query,
    ...HolidayResolvers.Query,
    ...LeaveResolvers.Query,
    ...ServiceResolvers.Query
  }
}
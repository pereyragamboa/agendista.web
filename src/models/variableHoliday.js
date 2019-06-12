/**
 * Returns the description of a variable holiday.
 * @param {number} month Month of the Gregorian year. January is 1.
 * @param {number} week Week of the month. 1 is the first week. 0 is the last week.
 * @param {number} dayOfWeek Day of the week. 0 is Sunday.
 */
export default function variableHoliday(month, week, dayOfWeek) {
  const res = { month, week, dayOfWeek };

  /**
   *
   * @param {number} year
   * @return {Date}
   */
  res.getHolidayDate = function(year = new Date().getFullYear()){
    const date = new Date(year, month - 1, 1);
    const firstDayOfMonth = date.getDay();

    // Calculation of date:
    // 1. Get the number of days in already elapsed weeks (during the nth week, n - 1 weeks have
    //    elapsed, therefore the week - 1)
    // 2. Get the number of elapsed days in the current week; the adding of 7 is for accounting
    //    days crossing the weekend (e. g. Tuesday [2] is four days after Friday [5]:
    //    5 + 4 = 9, 9 % 7 = 2 -> 4 = (7 + 2 - 5)
    // 3. Add 1, because day count begins at 1

    date.setDate(7 * (week - 1) + (7 + dayOfWeek - firstDayOfMonth) % 7 + 1);

    return date;
  };

  return res;
}
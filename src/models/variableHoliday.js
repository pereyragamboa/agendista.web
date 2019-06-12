/**
 * Returns the description of a variable holiday.
 * @param {number} month Month of the Gregorian year. January is 1.
 * @param {number} week Week of the month. 1 is the first week. 0 is the last week.
 * @param {number} dayOfWeek Day of the week. 0 is Sunday.
 */
export function variableHoliday(month, week, dayOfWeek) {
  const res = { month, week, dayOfWeek };

  /**
   * Returns the holiday date for a given year in the local time.
   *
   * @param {number} year The Gregorian year.
   * @return {Date} The holiday date.
   */
  res.getHolidayDate = function(year = new Date().getFullYear()){
    const date = new Date(year, month - 1, 1);
    const firstDayOfMonth = date.getDay();

    // Calculation of date:
    // 1. Get the number of days in already elapsed weeks (at the nth week, n - 1 full weeks have
    //    elapsed, therefore the week - 1)
    // 2. Get the number of elapsed days in the current week:
    //    * the adding of 7 is for accounting days crossing the weekend; e. g. Tuesday [2] is four
    //      days after Friday [5]:
    //      5 + 4 = 9, 9 % 7 = 2 -> (7 + 2 - 5) = 4
    //    * the remainder of 7 is for accounting the other cases; e. g. Saturday [6] is four days
    //      after Tuesday [2]:
    //      7 + 6 - 2 = 11, 11 % 7 = 4
    // 3. Add 1, because day count begins at 1

    date.setDate(7 * (week - 1) + (7 + dayOfWeek - firstDayOfMonth) % 7 + 1);

    return date;
  };

  return res;
}

/**
 * Constant for the last week of the month.
 *
 * @type {number}
 */
export const LAST_WEEK = 0;
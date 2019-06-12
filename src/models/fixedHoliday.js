/**
 * Returns a fixed yearly holiday, as the set of a day and a month.
 * @param {number} month The month of the Gregorian year. January is 1.
 * @param {number} day The day of the month, beginning with 1.
 */
export default function fixedHoliday(month, day) {
  const res = {};

  const date = new Date(0);
  date.setUTCMonth(month - 1, day);

  res.month = date.getUTCMonth() + 1;
  res.day = date.getUTCDate();

  /**
   * Returns the holiday date for a given year.
   * @param {number} year The Gregorian year.
   * @return {Date} The holiday date.
   */
  res.getHolidayDate = (year = new Date().getFullYear()) => {return new Date(year, res.month - 1, res.day);};

  return res;
}
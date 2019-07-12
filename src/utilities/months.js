function __validateMonth(monthIndex) {
  return typeof monthIndex === 'number' && monthIndex >= 0 && monthIndex < 12;
}

/**
 * Gets the name of a month using the specified format object.
 * @param monthIndex Index of a month. 0 is January, 11 is December.
 * @param monthFormat Description of the format.
 * @return {string} The name of the month.
 * @private This function is the base of the module. Its main purpose is allowing the reuse of monthFormat.
 */
function __getMonthName(monthIndex, monthFormat) {
  const d = new Date().setUTCMonth(Math.floor(monthIndex));
  return monthFormat.format(d);
}

const DEFAULT_OPTIONS = {
  timeZone: 'UTC',
  month: 'long'
};

/**
 * Gets the name of a month in the specified locale.
 *
 * @param monthIndex Index of a month. 0 is January, 11 is December.
 * @param locale Description of a locale. If none is given the default is used.
 * @return {string}
 */
export function getMonthName(monthIndex, locale = 'default') {
  if (!__validateMonth(monthIndex)) return '';
  const monthFormat = new Intl.DateTimeFormat(locale, DEFAULT_OPTIONS);
  return __getMonthName(monthIndex, monthFormat);
}

/**
 * Gets a list of all the names of the months in the specified locale.
 *
 * @param locale Description of a locale. If none is given the default is used.
 * @return {Array}
 */
export function getMonthNames(locale = 'default') {
  const months = [];
  const monthFormat = new Intl.DateTimeFormat(locale, DEFAULT_OPTIONS);

  for (let i = 0; i < 12; i++) {
    months.push(__getMonthName(i, monthFormat));
  }

  return months;
}

const __daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Gets the number of days in a month. If the month index is out of range, it returns 0.
 *
 * If the month index is a floating-point number, only the integer part is considered.
 *
 * @param monthIndex Index of a month. 0 is January, 11 is December.
 * @return {number} The maximum number of days for the specified month.
 */
export function getDaysInMonth(monthIndex) {
  return __validateMonth(monthIndex) ? __daysInMonth[Math.floor(monthIndex)] : 0;
}
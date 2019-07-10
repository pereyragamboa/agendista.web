/**
 * Gets the name of a month using the specified format object.
 * @param monthIndex Index of a month. 0 is January, 11 is December.
 * @param monthFormat Description of the format.
 * @return {string} The name of the month.
 * @private This function is the base of the module. Its main purpose is allowing the reuse of monthFormat.
 */
function __getMonthName(monthIndex, monthFormat) {
  const d = new Date().setUTCMonth(monthIndex);
  return monthFormat.format(d);
}

const DEFAULT_OPTIONS = {
  timeZone: 'UTC',
  month: 'long'
};

/**
 * Gets the name of a month in the specified locale.
 * @param monthIndex Index of a month. 0 is January, 11 is December.
 * @param locale Description of a locale. If none is given the default is used.
 * @return {string}
 */
export function getMonthName(monthIndex, locale = 'default') {
  const monthFormat = new Intl.DateTimeFormat(locale, DEFAULT_OPTIONS);

  return __getMonthName(monthIndex, monthFormat);
}

/**
 * Gets a list of all the names of the months in the
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

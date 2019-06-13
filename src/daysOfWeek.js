const DEFAULT_OPTIONS = { weekday: 'long' };
const DEFAULT_LOCALE = 'default';
const MILLISECONDS_PER_DAY = 1000 * 3600 * 24;

/**
 * Gets the name of a day of the week in the specified locale.
 *
 * @param {number} dayIndex Integer number of the day of the week, according to the values returned for Date.getDay().
 * @param {string} locale Locale for displaying the day name. If not provided, it uses the client default.
 * @return {string}
 */
function getDayName(dayIndex, locale = DEFAULT_LOCALE) {
  const day = new Date(MILLISECONDS_PER_DAY * (dayIndex - 3));
  return Intl.DateTimeFormat(locale, DEFAULT_OPTIONS).format(day);
}

/**
 * Gets the names of all days of the week in the specified locale.
 * @param {string} locale Locale for displaying the day name. If not provided, it uses the client default.
 * @return {Array}
 */
function getDayNames(locale = DEFAULT_LOCALE) {
  const res = [];
  for (let i = 0; i < 7; i++) {
    res.push(getDayName(i, locale));
  }
  return res;
}

export default { getDayName, getDayNames };

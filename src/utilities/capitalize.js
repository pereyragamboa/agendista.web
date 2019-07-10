/**
 * Capitalizes a string.
 *
 * @param {string} str The string to be capitalized.
 * @return {string} The capitalized string; if str is not a string, returns str
 */
export default (str) => {
  if (typeof str !== 'string' || str.length === 0) {
    // If it is not a string, or the string is empty, return input
    return str;
  } else {
    return [str[0].toUpperCase(), str.substr(1)].join('');
  }
};

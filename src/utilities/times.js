const DEFAULT_OPTIONS = {
  minimumIntegerDigits: 2,
  maximumFractionDigits: 0,
};

export function getTimeString(milliseconds, includeSeconds = false) {
  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;

  const res = `${
      (Math.floor(hours) % 24).toLocaleString('default', DEFAULT_OPTIONS)
      }:${
      (Math.floor(minutes) % 60).toLocaleString('default', DEFAULT_OPTIONS)}`;
  if (includeSeconds) {
    return `${res}:${Math.floor(seconds % 60).toLocaleString('default', DEFAULT_OPTIONS)}`;
  }
  return res;
}

export function getMilliseconds(timeString) {
  const timeRegex = /(\d+\d):([0-5]\d)(:([0-5]\d)(.\d+)?)?/;
  let res = 0;

  if (typeof timeString === 'string') {
    const match = timeString.match(timeRegex);
    // Match is an array containing:
    // 0: Entire match
    // 1: Hour fragment
    // 2: Minute fragment
    // 3: Rest of match, including the colon
    if (match !== null && match[0] === timeString) {
      res = Number.parseInt(match[1]) * 3600; // hh -> ss
      res += Number.parseInt(match[2]) * 60; // mm -> ss
      if (match[3] !== undefined) {
        res += Number.parseFloat(match[3].substring(1)); // ss
      }
      return res * 1000;
    }
  }
  return res;
}
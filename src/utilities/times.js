const DEFAULT_OPTIONS = {
  minimumIntegerDigits: 2,
  maximumFractionDigits: 0,
};

export function getTimeString(milliseconds, includeSeconds = false) {
  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;

  const res = `${
      (Math.floor(minutes / 60) % 60).toLocaleString('default', DEFAULT_OPTIONS)
      }:${
      Math.floor(minutes % 60).toLocaleString('default', DEFAULT_OPTIONS)}`;
  if (includeSeconds) {
    return `${res}:${Math.floor(seconds % 60).toLocaleString('default', DEFAULT_OPTIONS)}`;
  }
  return res;
}
import {getMonthNames} from "./months";

describe('Month tests', () => {
  const months = getMonthNames('en-US');
  console.log(months.join(' '));
  test('Creates an array of 12 elements', () => {
    expect(months.length).toBe(12);
  });
  test('All elements are strings', () => {
    months.forEach(day => expect(typeof day).toBe('string'));
  });
  test('First month is January', () => {
    expect(months[0].substr(0, 3)).toBe('Jan');
  });
});
import { getDaysInMonth, getMonthName, getMonthNames} from "./months";

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
  test('Get null name', () => {
    expect(getMonthName(12)).toBe('');
    expect(getMonthName('qwerty')).toBe('');
    expect(getMonthName(undefined)).toBe('');
  })
  test('Get days of months', () => {
    expect(getDaysInMonth(0)).toBe(31); // January
    expect(getDaysInMonth(1)).toBe(29); // February
    expect(getDaysInMonth(3)).toBe(30); // April
    expect(getDaysInMonth(10)).toBe(30); // November
    expect(getDaysInMonth(11)).toBe(31); // December
    expect(getDaysInMonth(12)).toBe(0); // Invalid month number
    expect(getDaysInMonth('foobar')).toBe(0); // not a number
  });
});
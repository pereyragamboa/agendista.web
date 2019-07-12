import {getDayNames} from "./daysOfWeek";

describe('Days of week tests', () => {
  const days = getDayNames('en-US');
  console.log(days.join(' '));
  test('Creates an array of 7 elements', () => {
    expect(days.length).toBe(7);
  });
  test('All elements are strings', () => {
    days.forEach(day => expect(typeof day).toBe('string'));
  });
  test('First month is Sunday', () => {
    expect(days[0].substr(0, 3)).toBe('Sun');
  });
});
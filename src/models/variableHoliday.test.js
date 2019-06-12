import { variableHoliday, LAST_WEEK } from './variableHoliday';

test("Creates variable holiday descriptors correctly", () => {
  for (let i = 0; i < 4; i++) {
    let holiday = variableHoliday(i + 2, i, i + 1);
    expect(holiday.month).toBe(i + 2);
    expect(holiday.week).toBe(i);
    expect(holiday.dayOfWeek).toBe(i + 1);
  }
});

test("Creates correct dates for 2019", () => {
  const dates = [7, 12, 20, 25, 3, 8, 21, 26, 3, 9, 21, 27];
  for (let i = 1; i <= 12; i++) {
    let holiday = variableHoliday(
        i, // month
        i % 4 === 0 ? 4 : i % 4, // week
        i % 7); // day
    let date = holiday.getHolidayDate(2019);
    expect(date.getDate()).toBe(dates[i - 1]);
  }
});

test.todo('Creates correct dates using last week of the month', () => {
  const dates = [28, 26, 27, 25, 31, 29, 28, 26, 24, 30, 28, 27];
  for (let i = 1; i <= 12; i++) {
    let holiday = variableHoliday(i, LAST_WEEK, i % 7);
    let date = holiday.getHolidayDate(2019);
    expect(date.getDate()).toBe(dates[i - 1]);
  }
});
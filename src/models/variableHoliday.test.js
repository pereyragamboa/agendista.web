import getVariableHoliday from './variableHoliday';

test("Creates variable holiday descriptors correctly", () => {
  for (let i = 0; i < 4; i++) {
    let holiday = getVariableHoliday(i + 2, i, i + 1);
    expect(holiday.month).toBe(i + 2);
    expect(holiday.week).toBe(i);
    expect(holiday.dayOfWeek).toBe(i + 1);
  }
});

test("Creates correct dates for 2019", () => {
  const dates = [7, 9, 17, 24];
  for (let i = 1; i <= 4; i++) {
    // This generates dates for January, April, July and October
    let holiday = getVariableHoliday(3 * i - 2, i, i);
    let date = holiday.getHolidayDate(2019);
    expect(date.getDate()).toBe(dates[i - 1]);
  }
});

test.todo('Creates correct dates using last week of the month');
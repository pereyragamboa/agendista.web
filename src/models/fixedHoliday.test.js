import { fixedHoliday } from './fixedHoliday';


describe('Fixed holiday tests', () => {
  const dates = [[5, 2], [1, 5], [16, 9], [25, 12]];

  test('Creates fixed holiday descriptors correctly', () => {
    dates.forEach((item) => {
      let holiday = fixedHoliday(item[1], item[0]);
      expect(holiday.month).toBe(item[1]);
      expect(holiday.day).toBe(item[0]);
    });
  });

  test('Creates a correct date in the current year', () => {
    const holiday = fixedHoliday(4, 22);
    const date = holiday.getHolidayDate();
    expect(date.getMonth()).toBe(holiday.month - 1);
    expect(date.getDate()).toBe(holiday.day);
  });

  test('Creates a correct date for other years', () => {
    const holiday = fixedHoliday(3, 18);
    for (let year = 1950; year <= 2050; year += 10) {
      let date = holiday.getHolidayDate(year);
      expect(date.getMonth()).toBe(holiday.month - 1);
      expect(date.getDate()).toBe(holiday.day);
    }
  });
});
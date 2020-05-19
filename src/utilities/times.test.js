const VALUES = [1, 60, 3600, 36000, 86400];
const RESULTS = ["00:00:01", "00:01:00", "01:00:00", "10:00:00", "00:00:00"];

import { getMilliseconds, getTimeString } from './times';

describe("getTimeString() tests", () => {
  VALUES.forEach((s, index) => {
    test(`Convert ${s} second(s) to time string (00:00)`, () => {
      expect(getTimeString(s * 1000)).toBe(RESULTS[index].substring(0, 5));
    });
    test(`Convert ${s} second(s) to time string (00:00:00)`, () =>{
      expect(getTimeString(s * 1000, true)).toBe(RESULTS[index]);
    })
  })
});

describe("getMilliseconds() test", () => {
  const valid = [
      ["12:34", 45240000],
      ["12:34:56", 45296000],
      ["12:34:56.789", 45296789],
      ["0:00", 0]
  ];

  const invalid = ["12:345", "", "abc", "123", "99:99"];

  test.each(valid)("Parse valid string %s", (string, result) => {
    expect(getMilliseconds(string)).toEqual(result);
  });

  test.each(invalid)("Parse invalid string %s", string => {
    expect(getMilliseconds(string)).toEqual(0);
  })
});
const VALUES = [1, 60, 3600, 36000, 86400];
const RESULTS = ["00:00:01", "00:01:00", "01:00:00", "10:00:00", "00:00:00"];

import { getTimeString } from './times';

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
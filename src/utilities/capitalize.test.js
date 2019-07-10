import capitalize from './capitalize';

describe("capitalize() tests", () => {
  test("capitalize 'abc'", () => {
    expect(capitalize("abc")).toBe("Abc");
  });
  test("capitalize 'xyz'", () => {
    expect(capitalize("xyz")).toBe("Xyz");
  });
  test("do nothing to 'KLM'", () => {
    expect(capitalize("KLM")).toBe("KLM");
  });
  test("capitalize 'ñññ'", () => {
    expect(capitalize("ñññ")).toBe("Ñññ");
  })
});
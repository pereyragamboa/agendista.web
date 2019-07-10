import capitalize from './capitalize';

describe("capitalize() tests", () => {
  test("capitalize 'abc'", () => {
    expect(capitalize("abc")).toBe("Abc");
  });
  test("capitalize 'xyz'", () => {
    expect(capitalize("xyz")).toBe("Xyz");
  });
  test("capitalize single character", () => {
    expect(capitalize("f")).toBe("F");
  });
  test("do nothing to 'KLM'", () => {
    expect(capitalize("KLM")).toBe("KLM");
  });
  test("do nothing to non-text string", () => {
    expect(capitalize("123")).toBe("123");
  });
  test("capitalize diacritics", () => {
    expect(capitalize("ñññ")).toBe("Ñññ");
  });
  test("capitalize Cyrillic string", () => {
    expect(capitalize("кириллица")).toBe("Кириллица")
  });
  test("capitalize Greeek string", () => {
    expect(capitalize("ελληνικό")).toBe("Ελληνικό")
  });
});
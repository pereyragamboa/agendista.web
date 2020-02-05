import getClassName from './getClassName';

const PROPS = {
  className: "foo bar"
};
const PADDED_PROPS = {
  className: "  foo bar  "
};
const CLASS_NAME = "fnord";
const PADDED_CLASS_NAME = "   fnord   ";
const JOINED_CLASS_NAMES = "fnord foo bar";

describe("getClassName() tests", () => {
  test("Joins class names", () => {
    expect(getClassName(CLASS_NAME, PROPS)).toBe(JOINED_CLASS_NAMES);
  });
  test("Returns only props class names", () => {
    expect(getClassName("", PROPS)).toBe(PROPS.className);
  });
  test("Returns only single class name", () => {
    expect(getClassName(CLASS_NAME, {})).toBe(CLASS_NAME);
  });
  test("Returns empty string", () => {
    expect(getClassName("", {})).toBe("");
  });
  test("Trims class names", () => {
    expect(getClassName(PADDED_CLASS_NAME, PADDED_PROPS)).toBe(JOINED_CLASS_NAMES);
  })
});
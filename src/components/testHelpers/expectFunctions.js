/**
 * Asserts that the rendered component has an <svg> component. Used with Feather icons.
 *
 * @param count Number of <svg> elements in the document. Default value is 1.
 */
export function expectIconRender(count = 1) {
  expect(document.getElementsByTagName("svg").length).toBe(count);
}

/**
 * Asserts that the rendered component has one element with the specified class name
 * and such element contains the specified text.
 * @param className Class name of the elements to be selected.
 * @param text Text to be searched for.
 */
export function expectTextInClass(className, text) {
  const elements = document.getElementsByClassName(className);
  expect(elements.length).toBe(1);
  expect(elements[0].textContent.trim().includes(text)).toBeTruthy();
}


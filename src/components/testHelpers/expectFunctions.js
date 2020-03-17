/**
 * Test that the rendered component has an <svg> component. Used with Feather icons.
 *
 * @param count Number of <svg> elements in the document. Default value is 1.
 */
export function testIconRender(count = 1) {
  expect(document.getElementsByTagName("svg").length).toBe(count);
}


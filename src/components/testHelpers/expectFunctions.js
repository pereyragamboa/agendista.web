import { LOADING_PANEL_ID } from "../commons/loadingPanel";

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
 * @param node Document node to be searched in. Defaults to document.
 */
export function expectTextInClass(className, text, node = document) {
  expect(node).not.toBeNull();
  expect(node.getElementByClassName).not.toBeNull();
  const elements = node.getElementsByClassName(className);
  expect(elements.length).toBe(1);
  expect(elements[0].textContent.trim().includes(text)).toBeTruthy();
}

/**
 * Asserts that the rendered document has an element with the specified identifier
 * and such element contains the specified text.
 * @param elementId Identifier of the element to be selected.
 * @param text Text to be searched for.
 */
export function expectTextInElement(elementId, text) {
  const element = document.getElementById(elementId);
  expect(element).not.toBeNull();
  expect(element.textContent.trim().includes(text)).toBeTruthy();
}

export function expectLoadingPanel(hasLoadingPanel = true) {
  const element = document.getElementById(LOADING_PANEL_ID);
  expect(element !== null).toBe(hasLoadingPanel);
}
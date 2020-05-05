import {act, Simulate} from "react-dom/test-utils";

/**
 * Simulates a value change in an <input> element.
 * @param fieldId Identifier of the element.
 * @param value Value to be assigned to the element.
 * @return {Promise<void>}
 */
export async function changeField(fieldId, value) {
  const element = document.getElementById(fieldId);
  await act(async () => {
    element.value = value;
    await Simulate.change(element);
    await Simulate.blur(element);
  });
}

import {unmountComponentAtNode} from "react-dom";

/**
 *
 * @return {{getContainer: (function(): *), createContainer: createContainer, disposeContainer: disposeContainer}}
 * @constructor
 */
export default function TestContainer() {
  let container = null;

  return {
    /**
     * Gets the container DOM element.
     * @return {*}
     */
    getContainer: function getContainer() { return container; },
    /**
     * Initializes the container element and adds it to the DOM.
     * @param elementTag
     */
    createContainer: function createContainer(elementTag = "div") {
      container = document.createElement(elementTag);
      document.body.appendChild(container);
    },
    /**
     * Removes the container element from the DOM.
     */
    disposeContainer: function disposeContainer() {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    }
  };
}
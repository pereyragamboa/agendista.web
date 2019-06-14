// This function was the least ugly solution I came up for showing a modal from
// another component. Evidently, this shows any element with the provided ID.
// Another solution might involve states, but I'm not sure it is worth the effort
// for showing a modal...

/**
 * Shows a modal element.
 *
 * The modal element is defined by the class "modal" of Bulma.
 *
 * @param {string} modalId ID of the modal element.
 */
export default (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal !== null && modal.classList.contains("modal")) {
    // If the element exists and is a modal, show
    modal.classList.add("is-active")
  }
};
// This function was the least ugly solution I came up for showing a modal from
// another component. Evidently, this shows any element with the provided ID.
// Another solution might involve states, but I'm not sure it is worth the effort
// for showing a modal...

export default (modalId) => document.getElementById(modalId).classList.add("is-active");
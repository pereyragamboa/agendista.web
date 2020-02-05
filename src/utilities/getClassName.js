/**
 * Joins a string containing CSS class names with those contained in component props.
 *
 * If props does not contain CSS classes, it returns className.
 * If className or props.className are not strings, they are considered as empty strings.
 *
 * @param className {string} Original classes.
 * @param props {object} Component props that might contain additional classes.
 * @return {string}
 */
export default function getClassName(className, props) {
  const originalClassName = (typeof className === 'string' ? className.trim() : '');
  const propsClassName = (
      typeof props === 'object' && typeof props.className === 'string' ?
          props.className.trim() : '');

  return propsClassName === '' ?
      originalClassName :
      [originalClassName, propsClassName].join(' ').trim();
}
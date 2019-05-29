export default function getClassName(className, props) {
  const originalClassName = (typeof className === 'string' ? className : '');
  const propsClassName = (
      typeof props === 'object' ?
      (typeof props.className === 'string' ? props.className : '') :
      '');

  return [originalClassName, propsClassName].join(' ');
}
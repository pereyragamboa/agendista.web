import * as Yup from 'yup';

/**
 * Schema for required strings.
 * @param message
 * @return {*}
 */
export const requiredString = message => Yup.string().required(message);
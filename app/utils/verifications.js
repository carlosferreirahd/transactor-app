import { isNil, isEmpty } from 'ramda';

export function isNilOrEmpty(value) {
  return isNil(value) || isEmpty(value);
}

const isPrimitive = require('../_internal/isPrimitive/isPrimitive');
const curry = require('../curry/curry');
const every = require('../every/every');
const keys = require('../keys/keys');
const type = require('../type/type');

function equals(a, b) {
  const aIsPrimitive = isPrimitive(a);
  const bIsPrimitive = isPrimitive(b);
  const typeOfA = typeof a;
  const typeOfB = typeof b;

  if (aIsPrimitive || bIsPrimitive) {
    if (typeOfA === 'number' && typeOfB === 'number') {
      return isNaN(a) ? isNaN(b) : a === b;
    }

    return a === b;
  }

  if ((aIsPrimitive && !bIsPrimitive) || (!aIsPrimitive && bIsPrimitive)) {
    return false;
  }

  const aType = type(a);
  const bType = type(b);

  if (aType !== bType) {
    return false;
  }

  if (aType === 'Array') {
    if (a.length !== b.length) {
      return false;
    }

    return every((item, index) => equals(item, b[index]), true, a);
  }

  if (aType === 'Object') {
    const aKeys = keys(a).sort();
    const bKeys = keys(b).sort();

    if ((aKeys.length !== bKeys.length) || !equals(aKeys, bKeys)) {
      return false;
    }

    return every(key => equals(a[key], b[key]), true, aKeys);
  }

  return a === b;
}

module.exports = curry(equals);

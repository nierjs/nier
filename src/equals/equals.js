const curry = require('../curry/curry');
const keys = require('../keys/keys');
const type = require('../type/type');

function equals(a, b) {
  const aType = type(a);
  const bType = type(b);

  if (aType !== bType) {
    return false;
  }

  if (aType === 'Number') {
    return isNaN(a) ? isNaN(b) : a === b;
  }

  if (aType === 'Array') {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i += 1) {
      if (!equals(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  if (aType === 'Object') {
    const aKeys = keys(a).sort();
    const bKeys = keys(b).sort();

    if ((aKeys.length !== bKeys.length) || !equals(aKeys, bKeys)) {
      return false;
    }

    for (let i = 0, l = aKeys.length; i < l; i += 1) {
      if (!equals(a[aKeys[i]], b[aKeys[i]])) {
        return false;
      }
    }

    return true;
  }

  return a === b;
}

module.exports = curry(equals);

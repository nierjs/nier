const curry = require('../curry/curry');


/**
 * Returns an array of enumerable own properties of the provided object.
 *
 * @since v1.0.0
 *
 * @param {Object} object
 * @return {Array}
 *
 * @see values
 *
 * @example
 * N.keys({}); // -> []
 * N.keys({ a: 1, b: 2, c: 3 }); // -> ['a', 'b', 'c']
 */
function keys(object) {
  if (object == null) {
    return [];
  }

  return Object.keys(object);
}

module.exports = curry(keys);

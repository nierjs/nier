const toInteger = require('../_internal/toInteger/toInteger');
const cloneArrayLike = require('../_internal/cloneArrayLike/cloneArrayLike');
const isArrayLike = require('../_internal/isArrayLike/isArrayLike');
const curry = require('../curry/curry');


/**
 * Creates an array of elements split into groups with provided length value.
 * If array can't be split evenly, the final chunk will contain the remaining elements.
 *
 * @since v1.0.0
 * @category Array
 *
 * @param {number} size size of each chunk
 * @param {Array} value value to process
 * @return {Array} array of chunks
 *
 * @example
 * N.chunk([1, 2, 3, 4, 5], 2); // -> [[1, 2], [3, 4], [5]]
 * N.chunk([1, 2], 3); // -> [[1, 2]]
 * N.chunk([], 2); // -> []
 */
function chunk(size, value) {
  if (!isArrayLike(value)) {
    throw new Error('N.chunk in not able to split values that are not array or array like');
  }

  const parsedSize = toInteger(size);
  const safeClone = cloneArrayLike(value);
  const result = [];

  for (let i = 0, l = safeClone.length; i < l; i += parsedSize) {
    result.push(safeClone.slice(i, i + size));
  }

  return result;
}

module.exports = curry(chunk);

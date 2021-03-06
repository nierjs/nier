/* eslint-disable no-new-func */

/**
 * Internal – this function is not available in public api.
 *
 * Creates new function with provided length value.
 * Although produced function length is fixed it can accept any amount of arguments.
 *
 * @since v1.0.0
 * @category Internal
 *
 * @param {number} length produced function arity
 * @param {Function} fn
 * @return {Function}
 *
 * @example
 * arity(5, f => f).length; // -> 5
 * arity(2, (...args) => args[0] + args[1]).length; // -> 2
 * arity(50, (..args) => args.reduce((acc, item) => acc + item)).length; // -> 50
 */
function arity(length, fn) {
  if (typeof length !== 'number' || length < 0) {
    throw new Error('N.arity received invalid length');
  }

  const params = [];

  for (let i = 0; i < length; i += 1) {
    params.push(`a${i}`);
  }

  const functionName = fn.name || 'arityN';
  const arityFn = new Function(
    'fn',
    `return function ${functionName}(${params.join(',')}){return fn.apply(this, arguments);}`
  );

  return arityFn(fn);
}

module.exports = arity;

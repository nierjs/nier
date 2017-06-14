module.exports = function createIterator(method, iterator) {
  return function iterable(fn, withIndex = false, data) {
    if (typeof fn !== 'function') {
      throw new Error(`${method} received callback that is not function`);
    }

    const shorthand = Array.isArray(withIndex);
    const finalData = shorthand ? withIndex : data;
    const iterableFn = !shorthand && withIndex
      ? (value, index) => fn(value, index)
      : value => fn(value);

    if (finalData) {
      return iterator(iterableFn, finalData);
    }

    return curriedData => iterator(iterableFn, curriedData);
  };
};
function applyFilter(filterFn, data) {
  const result = [];

  for (let i = 0, length = data.length; i < length; i += 1) {
    if (filterFn(data[i], i)) {
      result.push(data[i]);
    }
  }

  return result;
}

module.exports = function filter(fn, data, withIndex = true) {
  if (typeof fn !== 'function') {
    throw new Error('filter received callback that is not function');
  }

  const filterFn = withIndex
    ? (value, index) => fn(value, index)
    : value => fn(value);

  if (data) {
    return applyFilter(filterFn, data);
  }

  return curriedData => applyFilter(filterFn, curriedData);
};

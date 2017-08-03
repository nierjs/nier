const curry = require('../curry/curry');
const map = require('../map/map');
const path = require('../path/path');

function pluck(propPath, list) {
  return map(path(propPath), list);
}

module.exports = curry(pluck);

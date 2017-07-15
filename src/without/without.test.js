const test = require('tape-catch');
const testUtils = require('../../testUtils');
const without = require('./without');

test('without', (t) => {
  testUtils.isCurried(t, without([5]));

  t.deepEquals(
    without([1, 2], [1, 2, 3, 4]),
    [3, 4],
    'removes primitives from the array'
  );

  t.deepEquals(
    without([{ a: 1 }], [{ a: 1 }, { b: 2 }]),
    [{ b: 2 }],
    'removes objects from the array'
  );

  t.deepEquals(
    without([3], [1, 2]),
    [1, 2],
    'does not change initial array if it is not required'
  );

  t.end();
});

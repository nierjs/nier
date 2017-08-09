const test = require('tape-catch');
const testUtils = require('../../testUtils');
const intersection = require('./intersection');


test('intersection', (t) => {
  testUtils.isCurried(t, intersection([1, 2, 3]));

  t.deepEquals(
    intersection([1, 2, 3], [2, 3, 4]),
    [2, 3],
    'gets intersection from arrays with primitive values'
  );

  t.deepEquals(
    intersection([1, 2, 3], [3, 2, 1]),
    [1, 2, 3],
    'first array item order is used'
  );

  t.deepEquals(
    intersection([1, 2, 3], [4, 5, 6]),
    [],
    'returns empty array if intersection elements were not found'
  );

  t.deepEquals(
    intersection([{ a: 1 }, { a: 2 }, { a: 3 }], [{ a: 2 }, { a: 3 }, { a: 4 }]),
    [{ a: 2 }, { a: 3 }],
    'gets intersection from arrays with object values'
  );

  t.end();
});
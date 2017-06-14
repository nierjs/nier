const test = require('tape');
const filter = require('./filter');

const isEven = value => value % 2 === 0;
const indexGreaterThanZero = (value, index) => index > 0;
const filterEven = filter(isEven);
const filterByIndex = filter(indexGreaterThanZero, true);

test('filter', (t) => {
  t.equal(
    typeof filterEven,
    'function',
    'filter called with callback returns function'
  );

  t.deepEqual(
    filterEven([1, 2, 3]),
    [1, 2, 3].filter(isEven),
    'filtering works as regular filter method'
  );

  t.deepEqual(
    filterByIndex([1, 2, 3]),
    [1, 2, 3].filter(indexGreaterThanZero),
    'filter function provides index when required'
  );

  t.end();
});

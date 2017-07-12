const test = require('tape-catch');
const type = require('./type');

test('type', (t) => {
  t.equals(typeof type(), 'function', 'is curried');

  t.equals(type(undefined), 'Undefined', 'detects undefined type');
  t.equals(type(null), 'Null', 'detects null type');
  t.equals(type(1), 'Number', 'detects number type');
  t.equals(type('nier'), 'String', 'detects string type');
  t.equals(type('nier'), 'String', 'detects string type');
  t.equals(type(true), 'Boolean', 'detects boolean type');
  t.equals(type(Symbol('nier')), 'Symbol', 'detects symbol type');
  t.equals(type([]), 'Array', 'detects array type');
  t.equals(type({}), 'Object', 'detects object type');
  t.equals(type(f => f), 'Function', 'detects function type');
  t.equals(type(/nier/), 'RegExp', 'detects regexp type');

  t.end();
});

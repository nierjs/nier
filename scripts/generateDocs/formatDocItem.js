const N = require('../../src');
const extractTagContent = require('./extractTagContent');

module.exports = function format(docItem) {
  return {
    name: N.path(['ctx', 'name'], docItem),
    since: extractTagContent('since')(docItem),
    see: extractTagContent('see')(docItem),
    alias: extractTagContent('alias')(docItem),
    category: extractTagContent('category')(docItem),
    examples: extractTagContent('example')(docItem),
    description: N.path(['description', 'full'], docItem),
    params: N.pipe(
      N.path('tags'),
      N.filter(N.whereEq({ type: 'param' })),
      N.map(N.pick(['name', 'description', 'typesDescription']))
    )(docItem),
  };
};

const ctx = require('./common.js')
const uhppoted = require('../index.js')

uhppoted.getListener(ctx, 405419896)
  .then(response => console.log('\nget-listener:\n', response))
  .catch(err => console.log('ERROR', err))

const ctx = require('./common.js')
const uhppoted = require('../index.js')

uhppoted.getStatus(ctx, 405419896)
  .then(response => console.log('\nget-status:\n', response))
  .catch(err => console.log('ERROR', err))

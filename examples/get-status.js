const uhppoted = require('uhppoted')
const ctx = require('./common.js')

uhppoted.getStatus(ctx, 405419896)
  .then(response => console.log('\nget-status:\n', response))
  .catch(err => console.log('ERROR', err))

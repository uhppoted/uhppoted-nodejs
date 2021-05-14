const uhppoted = require('uhppoted')
const ctx = require('./common.js')

uhppoted.getTime(ctx, 405419896)
  .then(response => console.log('\nget-time:\n', response))
  .catch(err => console.log('ERROR', err))

const uhppoted = require('uhppoted')
const ctx = require('./common.js')

uhppoted.getListener(ctx, 405419896)
  .then(response => console.log('\nget-listener:\n', response))
  .catch(err => console.log('ERROR', err))

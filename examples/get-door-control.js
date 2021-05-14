const uhppoted = require('uhppoted')
const ctx = require('./common.js')

uhppoted.getDoorControl(ctx, 405419896, 3)
  .then(response => console.log('\nget-door-control:\n', response))
  .catch(err => console.log('ERROR', err))

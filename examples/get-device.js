const uhppoted = require('uhppoted')
const ctx = require('./common.js')

uhppoted.getDevice(ctx, 405419896)
  .then(response => console.log('\nget-device:\n', response))
  .catch(err => console.log('ERROR', err))

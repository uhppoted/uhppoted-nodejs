const ctx = require('./common.js')
const uhppoted = require('../index.js')

uhppoted.getDevice(ctx, 405419896)
  .then(response => console.log('\nget-device:\n', response))
  .catch(err => console.log('ERROR', err))

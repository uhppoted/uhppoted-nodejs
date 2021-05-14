const uhppoted = require('uhppoted')
const ctx = require('./common.js')

uhppoted.setListener(ctx, 405419896, '192.168.1.100', 60001)
  .then(response => console.log('\nset-time:\n', response))
  .catch(err => console.log('ERROR', err))

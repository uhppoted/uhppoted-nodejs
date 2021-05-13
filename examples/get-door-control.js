const ctx = require('./common.js')
const uhppoted = require('../index.js')

uhppoted.getDoorControl(ctx, 405419896, 3)
  .then(response => console.log('\nget-door-control:\n', response))
  .catch(err => console.log('ERROR', err))

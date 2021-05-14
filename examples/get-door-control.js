const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896

uhppoted.getDoorControl(ctx, deviceID, 3)
  .then(response => console.log('\nget-door-control:\n', response))
  .catch(err => console.log('ERROR', err))

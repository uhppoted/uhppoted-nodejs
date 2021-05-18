const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896

uhppoted.getTime(ctx, deviceID)
  .then(response => console.log('\nget-time:\n', response))
  .catch(err => console.log(err))

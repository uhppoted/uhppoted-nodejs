const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const deviceID = 405419896

uhppoted.getStatus(ctx, deviceID)
  .then(response => {
    console.log('\nget-status:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const deviceID = 405419896

uhppoted.recordSpecialEvents(ctx, deviceID, true)
  .then(response => {
    console.log('\nrecord-special-events:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

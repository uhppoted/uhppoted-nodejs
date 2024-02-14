const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896

uhppoted.restoreDefaultParameters(ctx, deviceID)
  .then(response => {
    console.log('\nrestore-default-parameters:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

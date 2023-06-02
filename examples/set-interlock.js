const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const interlock = 3

uhppoted.setInterlock(ctx, deviceID, interlock)
  .then(response => {
    console.log('\nset-interlock:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

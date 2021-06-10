const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896

uhppoted.clearTimeProfiles(ctx, deviceID)
  .then(response => {
    console.log('\nclear-time-profiles:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

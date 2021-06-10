const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const profileID = 29

uhppoted.getTimeProfile(ctx, deviceID, profileID)
  .then(response => {
    console.log('\nget-time-profile:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

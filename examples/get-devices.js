const uhppoted = require('uhppoted')
const ctx = require('./common.js')

uhppoted.getDevices(ctx)
  .then(response => {
    console.log('\nget-devices:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

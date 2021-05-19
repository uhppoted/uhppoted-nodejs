const ctx = require('./common.js')
const uhppoted = require('../index.js')

uhppoted.getDevices(ctx)
  .then(response => {
    console.log('\nget-devices:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

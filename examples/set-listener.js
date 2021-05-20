const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const deviceID = 405419896

uhppoted.setListener(ctx, deviceID, '192.168.1.100', 60001)
  .then(response => {
    console.log('\nset-time:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const deviceID = 405419896

uhppoted.setDoorControl(ctx, deviceID, 3, 4, 'normally closed')
  .then(response => {
    console.log('\nset-door-control:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

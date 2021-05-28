const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const deviceID = 405419896
const door = 3

uhppoted.openDoor(ctx, deviceID, door)
  .then(response => {
    console.log('\nopen-door:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

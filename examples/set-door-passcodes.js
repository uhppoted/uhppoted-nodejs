const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const door = 3
const passcodes = [12345, 0, 999999, 54321]

uhppoted.setDoorPasscodes(ctx, deviceID, door, passcodes)
  .then(response => {
    console.log('\nset-door-passcodes:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

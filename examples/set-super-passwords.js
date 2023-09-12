const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const door = 3
const passwords = [12345, 0, 999999, 54321]

uhppoted.setSuperPasswords(ctx, deviceID, door, passwords)
  .then(response => {
    console.log('\nset-super-passwords:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

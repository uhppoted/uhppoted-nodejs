const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const door = 1

try {
  uhppoted.openDoor(ctx, deviceID, door)
    .then(response => console.log('\nopen-door:\n', response))
    .catch(err => {
      console.log(err.toString())
    })
} catch (err) {
  console.log(err.toString())
}

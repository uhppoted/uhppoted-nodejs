const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const door = 3

async function run() {
  await uhppoted
    .openDoor(ctx, deviceID, door)
    .then((response) => {
      console.log('\nopen-door:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .openDoor(ctx, { id: deviceID, address: addr, protocol: 'tcp' }, door)
    .then((response) => {
      console.log('\nopen-door:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

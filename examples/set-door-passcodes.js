const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const door = 3
const passcodes = [12345, 0, 999999, 54321]

async function run() {
  await uhppoted
    .setDoorPasscodes(ctx, deviceID, door, passcodes)
    .then((response) => {
      console.log('\nset-door-passcodes:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .setDoorPasscodes(
      ctx,
      { id: deviceID, address: addr, protocol: 'tcp' },
      door,
      passcodes,
    )
    .then((response) => {
      console.log('\nset-door-passcodes:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

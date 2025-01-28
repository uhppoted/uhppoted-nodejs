const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'

async function run() {
  await uhppoted
    .setDoorControl(ctx, deviceID, 3, 4, 'normally closed')
    .then((response) => {
      console.log('\nset-door-control:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .setDoorControl(
      ctx,
      { id: deviceID, address: addr, protocol: 'tcp' },
      3,
      4,
      'normally closed',
    )
    .then((response) => {
      console.log('\nset-door-control:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

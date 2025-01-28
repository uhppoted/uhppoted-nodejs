const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const index = 29

async function run() {
  await uhppoted
    .setEventIndex(ctx, deviceID, index)
    .then((response) => {
      console.log('\nset-event-index:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .setEventIndex(ctx, { id: deviceID, address: addr, protocol: 'tcp' }, index)
    .then((response) => {
      console.log('\nset-event-index:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

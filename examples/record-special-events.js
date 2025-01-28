const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'

async function run() {
  await uhppoted
    .recordSpecialEvents(ctx, deviceID, true)
    .then((response) => {
      console.log('\nrecord-special-events:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .recordSpecialEvents(
      ctx,
      { id: deviceID, address: addr, protocol: 'tcp' },
      true,
    )
    .then((response) => {
      console.log('\nrecord-special-events:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

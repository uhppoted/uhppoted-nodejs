const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'

async function run() {
  await uhppoted
    .setListener(ctx, deviceID, '192.168.1.100', 60001, 15)
    .then((response) => {
      console.log('\nset-listener:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .setListener(
      ctx,
      { id: deviceID, address: addr, protocol: 'tcp' },
      '192.168.1.100',
      60001,
      15,
    )
    .then((response) => {
      console.log('\nset-listener:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

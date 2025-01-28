const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const keypads = {
  1: true,
  2: true,
  3: false,
  4: true,
}

async function run() {
  await uhppoted
    .activateKeypads(ctx, deviceID, keypads)
    .then((response) => {
      console.log('\nactivate-keypads:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .activateKeypads(
      ctx,
      { id: deviceID, address: addr, protocol: 'tcp' },
      keypads,
    )
    .then((response) => {
      console.log('\nactivate-keypads:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

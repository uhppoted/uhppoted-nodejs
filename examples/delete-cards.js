const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'

async function run() {
  await uhppoted
    .deleteCards(ctx, deviceID)
    .then((response) => {
      console.log('\ndelete-cards:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .deleteCards(ctx, { id: deviceID, address: addr, protocol: 'tcp' })
    .then((response) => {
      console.log('\ndelete-cards:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

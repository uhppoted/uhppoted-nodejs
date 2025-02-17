const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const host = '192.168.1.100'
const addr = { address: '192.168.1.100', port: 60000 }

async function run() {
  await uhppoted
    .getDevice(ctx, deviceID)
    .then((response) => {
      console.log('\nget-device:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .getDevice(ctx, { id: deviceID, address: host, protocol: 'tcp' })
    .then((response) => {
      console.log('\nget-device:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .getDevice(ctx, { id: deviceID, address: addr, protocol: 'tcp' })
    .then((response) => {
      console.log('\nget-device:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

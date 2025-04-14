const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const antipassback = 2

async function run() {
  await uhppoted
    .setAntiPassback(ctx, deviceID, antipassback)
    .then((response) => {
      console.log('\nset-antipassback:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .setAntiPassback(ctx, { id: deviceID, address: addr, protocol: 'tcp' }, antipassback)
    .then((response) => {
      console.log('\nset-antipassback:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'

async function run() {
  await uhppoted
    .setIP(ctx, deviceID, '192.168.1.100', '255.255.255.0', '192.168.1.1')
    .then((response) => {
      console.log('\nset-IP:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .setIP(ctx, { id: deviceID, address: addr, protocol: 'tcp' }, '192.168.1.100', '255.255.255.0', '192.168.1.1')
    .then((response) => {
      console.log('\nset-IP:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

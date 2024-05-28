const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const interlock = 3

async function run () {
  await uhppoted.setInterlock(ctx, deviceID, interlock)
    .then(response => {
      console.log('\nset-interlock:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.setInterlock(ctx, { controller: deviceID, address: addr, protocol: 'tcp' }, interlock)
    .then(response => {
      console.log('\nset-interlock:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

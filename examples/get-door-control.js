const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'

async function run () {
  await uhppoted.getDoorControl(ctx, deviceID, 3)
    .then(response => {
      console.log('\nget-door-control:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.getDoorControl(ctx, { id: deviceID, address: addr, protocol: 'tcp' }, 3)
    .then(response => {
      console.log('\nget-door-control:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}
run()

const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const index = 29

async function run () {
  await uhppoted.getEvent(ctx, deviceID, index)
    .then(response => {
      console.log('\nget-event:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.getEvent(ctx, { controller: deviceID, address: addr, protocol: 'tcp' }, index)
    .then(response => {
      console.log('\nget-event:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

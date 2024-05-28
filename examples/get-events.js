const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'

async function run () {
  await uhppoted.getEvents(ctx, deviceID)
    .then(response => {
      console.log('\nget-events:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.getEvents(ctx, { controller: deviceID, address: addr, protocol: 'tcp' })
    .then(response => {
      console.log('\nget-events:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

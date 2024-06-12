const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const profile = 29

async function run () {
  await uhppoted.getTimeProfile(ctx, deviceID, profile)
    .then(response => {
      console.log('\nget-time-profile:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.getTimeProfile(ctx, { id: deviceID, address: addr, protocol: 'tcp' }, profile)
    .then(response => {
      console.log('\nget-time-profile:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

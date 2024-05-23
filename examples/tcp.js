const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'

async function run () {
  await uhppoted.getDevice(ctx, deviceID, { dest: addr, protocol: 'tcp' })
    .then(response => {
      console.log('\nget-device:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.getListener(ctx, deviceID, { dest: addr, protocol: 'tcp' })
    .then(response => {
      console.log('\nget-listener:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

uhppoted.getDevice(ctx, deviceID, { dest: addr, protocol: 'tcp' })
  .then(response => {
    console.log('\nget-device:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

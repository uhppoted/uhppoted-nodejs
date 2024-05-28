const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'

async function run () {
  await uhppoted.setPCControl(ctx, deviceID, true)
    .then(response => {
      console.log('set-pc-control  ', response.deviceId, response.ok ? 'ok' : 'error')
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.setPCControl(ctx, { controller: deviceID, address: addr, protocol: 'tcp' }, true)
    .then(response => {
      console.log('set-pc-control  ', response.deviceId, response.ok ? 'ok' : 'error')
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

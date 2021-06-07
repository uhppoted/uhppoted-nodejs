const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896

uhppoted.addDevice(ctx.config, deviceID, '192.168.1.100:60000', 'asdfasd')

uhppoted.getDevice(ctx, deviceID)
  .then(response => {
    console.log('\nget-device:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

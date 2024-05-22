const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896

uhppoted.getDevice(ctx, deviceID, { dest: '192.168.1.100', protocol: 'tcp' })
  .then(response => {
    console.log('\nget-device:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

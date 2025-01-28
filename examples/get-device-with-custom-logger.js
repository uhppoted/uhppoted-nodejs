const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896

ctx.logger = function log(msg) {
  console.log('\n>> DEBUG: ', msg)
}

uhppoted
  .getDevice(ctx, deviceID)
  .then((response) => {
    console.log('\nget-device:\n', response)
  })
  .catch((err) => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

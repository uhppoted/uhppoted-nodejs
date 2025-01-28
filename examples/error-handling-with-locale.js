const uhppoted = require('uhppoted')
const ctx = require('./common.js')

ctx.locale = 'klingon'

uhppoted
  .getDevice(ctx, 0)
  .then((response) => {
    console.log('get-device:\n', response)
  })
  .catch((err) => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

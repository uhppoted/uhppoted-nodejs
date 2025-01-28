const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const index = 29

ctx.locale = 'qwerty'

uhppoted
  .getEvent(ctx, deviceID, index)
  .then((response) => {
    console.log('\nget-event:\n', response)
  })
  .catch((err) => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

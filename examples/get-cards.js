const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const deviceID = 405419896

uhppoted.getCards(ctx, deviceID)
  .then(response => {
    console.log('\nget-cards:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const keypads = {
  1: true,
  2: true,
  3: false,
  4: true
}

uhppoted.activateKeypads(ctx, deviceID, keypads)
  .then(response => {
    console.log('\nactivate-keypads:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

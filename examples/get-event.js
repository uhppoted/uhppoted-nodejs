const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const index = 29

uhppoted.getEvent(ctx, deviceID, index)
  .then(response => console.log('\nget-event:\n', response))
  .catch(err => console.log('ERROR', err))

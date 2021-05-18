const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const index = 23

uhppoted.setEventIndex(ctx, deviceID, index)
  .then(response => console.log('\nset-event-index:\n', response))
  .catch(err => console.log(err))

const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896

try {
  uhppoted.getEvents(ctx, deviceID)
    .then(response => console.log('\nget-events:\n', response))
    .catch(err => {
      console.log(err.toString())
    })
} catch (err) {
  console.log(err.toString())
}

const ctx = require('./common.js')
const uhppoted = require('../index.js')

try {
  uhppoted.getDevices(ctx)
    .then(response => console.log('\nget-devices:\n', response))
    .catch(err => {
      console.log(err.toString())
    })
} catch (err) {
  console.log(err.toString())
}

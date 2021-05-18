const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896

try {
  uhppoted.setDoorControl(ctx, deviceID, 3, 4, 'normally closed')
    .then(response => console.log('\nset-door-control:\n', response))
    .catch(err => {
      console.log(err.toString())
    })
} catch (err) {
  console.log(err.toString())
}

const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 201020304
const index = 73
const ctx2 = {
  config: new uhppoted.Config(ctx.config.name,
    ctx.config.bind,
    ctx.config.broadcast,
    ctx.config.listen,
    ctx.config.timeout,
    [{
      deviceId: 201020304,
      address: '192.168.1.100:60000',
      forceBroadcast: true
    }],
    ctx.config.debug)
}

uhppoted.getEvent(ctx2, deviceID, index)
  .then(response => {
    console.log('\nget-event:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

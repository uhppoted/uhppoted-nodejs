const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const isValidDeviceId = require('./common.js').isValidDeviceId

function setTime (ctx, deviceId, datetime) {
  const initialise = new Promise((resolve, reject) => {
    if (!isValidDeviceId(deviceId)) {
      reject(new Error(`invalid device ID '${deviceId}'`))
      return
    }

    resolve({
      config: ctx.config,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return initialise
    .then(context => uhppoted.set(context, deviceId, opcodes.SetTime, { datetime }))
}

exports = module.exports = setTime

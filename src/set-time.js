const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const validateDeviceId = require('./common.js').validateDeviceId

function setTime (ctx, deviceId, datetime) {
  validateDeviceId(deviceId)

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.SetTime, { datetime })
}

exports = module.exports = setTime

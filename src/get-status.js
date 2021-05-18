const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const validateDeviceId = require('./common.js').validateDeviceId

function getStatus (ctx, deviceId) {
  validateDeviceId(deviceId)

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetStatus, {})
}

exports = module.exports = getStatus

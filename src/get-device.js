const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const validateDeviceId = require('./common.js').validateDeviceId

function getDevice (ctx, deviceId) {
  validateDeviceId(deviceId)

  const context = {
    config: ctx.config,
    logger: (m) => { log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetDevice, {})
}

exports = module.exports = getDevice

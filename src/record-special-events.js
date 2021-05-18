const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const validateDeviceId = require('./common.js').validateDeviceId

function recordSpecialEvents (ctx, deviceId, enable) {
  validateDeviceId(deviceId)

  const context = {
    config: ctx.config,
    logger: ctx.logger ? ctx.logger : (m) => { log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.RecordSpecialEvents, { enable: enable })
}

exports = module.exports = recordSpecialEvents

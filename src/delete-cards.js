const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const validateDeviceId = require('./common.js').validateDeviceId

function deleteCards (ctx, deviceId) {
  validateDeviceId(deviceId)

  const context = {
    config: ctx.config,
    logger: (m) => { log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.DeleteCards, {})
}

exports = module.exports = deleteCards

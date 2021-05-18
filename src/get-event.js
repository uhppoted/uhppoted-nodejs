const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const validateDeviceId = require('./common.js').validateDeviceId
const validateEventIndex = require('./common.js').validateEventIndex

function getEvent (ctx, deviceId, index) {
  validateDeviceId(deviceId)
  validateEventIndex(index)

  const context = {
    config: ctx.config,
    logger: (m) => { log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetEvent, { index: index })
}

exports = module.exports = getEvent

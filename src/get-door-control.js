const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const validateDeviceId = require('./common.js').validateDeviceId
const validateDoor = require('./common.js').validateDoor

function getDoorControl (ctx, deviceId, door) {
  validateDeviceId(deviceId)
  validateDoor(door)

  const context = {
    config: ctx.config,
    logger: ctx.logger ? ctx.logger : (m) => { log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetDoorControl, { door: door })
}

exports = module.exports = getDoorControl

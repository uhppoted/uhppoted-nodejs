const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const validateDeviceId = require('./common.js').validateDeviceId
const validateDoor = require('./common.js').validateDoor

function openDoor (ctx, deviceId, door) {
  validateDeviceId(deviceId)
  validateDoor(door)

  const context = {
    config: ctx.config,
    logger: (m) => { log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.OpenDoor, { door: door })
}

exports = module.exports = openDoor

const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const common = require('./common.js')

function openDoor (ctx, deviceId, door) {
  if (!common.isValidDeviceId(deviceId)) {
    throw new Error(`invalid device ID ${deviceId}`)
  }

  if (!common.isValidDoor(door)) {
    throw new Error(`invalid door ${door}`)
  }

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.OpenDoor, { door: door })
}

exports = module.exports = openDoor

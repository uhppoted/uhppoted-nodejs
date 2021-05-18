const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const validateDeviceId = require('./common.js').validateDeviceId
const validateDoor = require('./common.js').validateDoor

function setDoorControl (ctx, deviceId, door, delay, control) {
  validateDeviceId(deviceId)
  validateDoor(door)

  const context = {
    config: ctx.config,
    logger: (m) => { log(m) }
  }

  let controlv = 0x00

  switch (control) {
    case 'normally open':
      controlv = opcodes.NormallyOpen
      break

    case 'normally closed':
      controlv = opcodes.NormallyClosed
      break

    case 'controlled':
      controlv = opcodes.Controlled
      break

    default:
      throw new Error(`Invalid door control value ((${control})`)
  }

  return uhppoted.get(context, deviceId, opcodes.SetDoorControl, { door: door, delay: delay, control: controlv })
}

exports = module.exports = setDoorControl

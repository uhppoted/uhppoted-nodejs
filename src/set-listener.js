const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const validateDeviceId = require('./common.js').validateDeviceId

function setListener (ctx, deviceId, address, port) {
  validateDeviceId(deviceId)

  const context = {
    config: ctx.config,
    logger: (m) => { log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.SetListener, { address: address, port: port })
}

exports = module.exports = setListener

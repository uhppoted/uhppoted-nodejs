const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const validateDeviceId = require('./common.js').validateDeviceId

function recordSpecialEvents (ctx, deviceId, enable) {
  validateDeviceId(deviceId)

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.RecordSpecialEvents, { enable: enable })
}

exports = module.exports = recordSpecialEvents

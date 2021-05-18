const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const common = require('./common.js')

function recordSpecialEvents (ctx, deviceId, enable) {
  if (!common.isValidDeviceId(deviceId)) {
    throw new Error(`invalid device ID ${deviceId}`)
  }

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.RecordSpecialEvents, { enable: enable })
}

exports = module.exports = recordSpecialEvents

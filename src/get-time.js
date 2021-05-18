const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const common = require('./common.js')

function getTime (ctx, deviceId) {
  if (!common.isValidDeviceId(deviceId)) {
    throw new Error(`invalid device ID ${deviceId}`)
  }

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetTime, {})
}

exports = module.exports = getTime

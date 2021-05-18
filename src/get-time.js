const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function getTime (ctx, deviceId) {
  if (!deviceId || Number.isNaN(deviceId) || deviceId < 1) {
    throw new Error(`invalid device ID ${deviceId}`)
  }

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetTime, {})
}

exports = module.exports = getTime

const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function recordSpecialEvents (ctx, deviceId, enable) {
  if (!deviceId || Number.isNaN(deviceId) || deviceId < 1) {
    throw new Error(`invalid device ID ${deviceId}`)
  }

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.RecordSpecialEvents, { enable: enable })
}

exports = module.exports = recordSpecialEvents

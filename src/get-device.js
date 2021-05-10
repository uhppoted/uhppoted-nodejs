const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function getDevice (ctx, deviceId) {
  const context = {
    config: ctx.config
  }

  return uhppoted.get(context, deviceId, opcodes.GetDevice, {})
}

exports = module.exports = getDevice

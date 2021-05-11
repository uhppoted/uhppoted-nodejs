const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function getTime (ctx, deviceId) {
  const context = {
    config: ctx.config
  }

  return uhppoted.get(context, deviceId, opcodes.GetTime, {})
}

exports = module.exports = getTime

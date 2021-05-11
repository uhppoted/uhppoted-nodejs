const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function setTime (ctx, deviceId, datetime) {
  const context = {
    config: ctx.config
  }

  return uhppoted.set(context, deviceId, opcodes.SetTime, { datetime })
}

exports = module.exports = setTime

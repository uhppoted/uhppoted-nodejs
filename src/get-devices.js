const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function getDevices (ctx) {
  const context = {
    config: ctx.config
  }

  return uhppoted.broadcast(context, opcodes.GetDevice, {})
}

exports = module.exports = getDevices

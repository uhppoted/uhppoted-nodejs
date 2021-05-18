const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')

function getDevices (ctx) {
  const context = {
    config: ctx.config,
    logger: (m) => { log(m) }
  }

  return uhppoted.broadcast(context, opcodes.GetDevice, {})
}

exports = module.exports = getDevices

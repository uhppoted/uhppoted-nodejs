const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function getStatus (ctx, deviceId) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetStatus, {})
}

exports = module.exports = getStatus

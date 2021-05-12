const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function getListener (ctx, deviceId) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetListener, {})
}

exports = module.exports = getListener

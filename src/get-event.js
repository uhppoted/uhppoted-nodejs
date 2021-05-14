const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function getEvent (ctx, deviceId, index) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetEvent, { index: index })
}

exports = module.exports = getEvent

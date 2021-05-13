const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function deleteCards (ctx, deviceId) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.DeleteCards, {})
}

exports = module.exports = deleteCards

const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function deleteCard (ctx, deviceId, card) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.DeleteCard, { card: card })
}

exports = module.exports = deleteCard

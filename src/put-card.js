const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function putCard (ctx, deviceId, card_number, valid_from, valid_until, doors) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.PutCard, { card: card_number, from: valid_from, to: valid_until, doors: doors })
}

exports = module.exports = putCard

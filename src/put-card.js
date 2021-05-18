const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const common = require('./common.js')

function putCard (ctx, deviceId, card, validFrom, validUntil, doors) {
  if (!common.isValidDeviceId(deviceId)) {
    throw new Error(`invalid device ID ${deviceId}`)
  }

  if (!common.isValidCardNumber(card)) {
    throw new Error(`invalid card number ${card}`)
  }

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.PutCard, { card: card, from: validFrom, to: validUntil, doors: doors })
}

exports = module.exports = putCard

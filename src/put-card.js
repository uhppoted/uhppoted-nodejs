const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const validateDeviceId = require('./common.js').validateDeviceId
const validateCardNumber = require('./common.js').validateCardNumber

function putCard (ctx, deviceId, card, validFrom, validUntil, doors) {
  validateDeviceId(deviceId)
  validateCardNumber(card)

  const context = {
    config: ctx.config,
    logger: (m) => { log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.PutCard, { card: card, from: validFrom, to: validUntil, doors: doors })
}

exports = module.exports = putCard

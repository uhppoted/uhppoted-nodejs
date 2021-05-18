const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const validateDeviceId = require('./common.js').validateDeviceId
const validateCardNumber = require('./common.js').validateCardNumber

function deleteCard (ctx, deviceId, card) {
  validateDeviceId(deviceId)
  validateCardNumber(card)

  const context = {
    config: ctx.config,
    logger: ctx.logger ? ctx.logger : (m) => { log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.DeleteCard, { card: card })
}

exports = module.exports = deleteCard

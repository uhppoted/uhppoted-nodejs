const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const common = require('./common.js')

function deleteCard (ctx, deviceId, card) {
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

  return uhppoted.get(context, deviceId, opcodes.DeleteCard, { card: card })
}

exports = module.exports = deleteCard

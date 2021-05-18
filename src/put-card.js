const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function putCard (ctx, deviceId, cardNumber, validFrom, validUntil, doors) {
  if (!deviceId || Number.isNaN(deviceId) || deviceId < 1) {
    throw new Error(`invalid device ID ${deviceId}`)
  }

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.PutCard, { card: cardNumber, from: validFrom, to: validUntil, doors: doors })
}

exports = module.exports = putCard

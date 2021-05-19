const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const isValidDeviceId = require('./common.js').isValidDeviceId
const isValidCardNumber = require('./common.js').isValidCardNumber

function putCard (ctx, deviceId, card, validFrom, validUntil, doors) {
  const initialise = new Promise((resolve, reject) => {
    if (!isValidDeviceId(deviceId)) {
      reject(new Error(`invalid device ID '${deviceId}'`))
      return
    }

    if (!isValidCardNumber(card)) {
      reject(new Error(`invalid card number '${card}'`))
      return
    }

    resolve({
      config: ctx.config,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return initialise
    .then(context => uhppoted.set(context, deviceId, opcodes.PutCard, { card: card, from: validFrom, to: validUntil, doors: doors }))
}

exports = module.exports = putCard

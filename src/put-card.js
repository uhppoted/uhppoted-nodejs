const set = require('./uhppoted.js').set
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
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
    .then(context => set(context, deviceId, opcodes.PutCard, { card: card, from: validFrom, to: validUntil, doors: doors }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = putCard
const set = require('./uhppoted.js').set
const opcodes = require('./opcodes.js')
const errors = require('./errors.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const isValidDeviceId = require('./common.js').isValidDeviceId
const isValidCardNumber = require('./common.js').isValidCardNumber

function deleteCard (ctx, deviceId, card) {
  const initialise = new Promise((resolve, reject) => {
    if (!isValidDeviceId(deviceId)) {
      reject(errors.InvalidDeviceID(deviceId))
      return
    }

    if (!isValidCardNumber(card)) {
      reject(errors.InvalidCardNumber(card))
      return
    }

    resolve({
      config: ctx.config,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return initialise
    .then(context => set(context, deviceId, opcodes.DeleteCard, { card: card }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = deleteCard

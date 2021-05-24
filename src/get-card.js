const get = require('./uhppoted.js').get
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const isValidDeviceId = require('./common.js').isValidDeviceId
const isValidCardNumber = require('./common.js').isValidCardNumber

function getCard (ctx, deviceId, card) {
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
    .then(context => get(context, deviceId, opcodes.GetCardByID, { card: card }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getCard

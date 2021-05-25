const get = require('./uhppoted.js').get
const opcodes = require('./opcodes.js')
const errors = require('./errors.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const isValidDeviceId = require('./common.js').isValidDeviceId
const isValidCardIndex = require('./common.js').isValidCardIndex

function getCardByIndex (ctx, deviceId, index) {
  const initialise = new Promise((resolve, reject) => {
    if (!isValidDeviceId(deviceId)) {
      reject(errors.InvalidDeviceID(deviceId, ctx.locale))
      return
    }

    if (!isValidCardIndex(index)) {
      reject(errors.InvalidCardIndex(index, ctx.locale))
      return
    }

    resolve({
      config: ctx.config,
      locale: ctx.locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return initialise
    .then(context => get(context, deviceId, opcodes.GetCardByIndex, { index: index }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getCardByIndex

const get = require('./uhppoted.js').get
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate

function getCardByIndex (ctx, deviceId, index) {
  const initialise = new Promise((resolve, reject) => {
    resolve({
      config: ctx.config,
      locale: ctx.locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return validate({ deviceId: deviceId, cardIndex: index }, ctx.locale)
    .then(ok => initialise)
    .then(context => get(context, deviceId, opcodes.GetCardByIndex, { index: index }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getCardByIndex

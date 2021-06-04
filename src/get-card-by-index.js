const get = require('./driver.js').get
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function getCardByIndex (ctx, deviceId, index) {
  return validate({ deviceId: deviceId, cardIndex: index }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => get(context, deviceId, opcodes.GetCardByIndex, { index: index }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getCardByIndex

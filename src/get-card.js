const get = require('./driver.js').get
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function getCard (ctx, deviceId, card) {
  return validate({ deviceId: deviceId, cardNumber: card }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => get(context, deviceId, opcodes.GetCardByID, { card: card }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getCard

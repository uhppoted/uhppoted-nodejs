const set = require('./uhppoted.js').set
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function putCard (ctx, deviceId, card, validFrom, validUntil, doors) {
  return validate({ deviceId: deviceId, cardNumber: card }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => set(context, deviceId, opcodes.PutCard, { card: card, from: validFrom, to: validUntil, doors: doors }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = putCard

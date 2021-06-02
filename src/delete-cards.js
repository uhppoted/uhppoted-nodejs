const set = require('./uhppoted.js').set
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function deleteCards (ctx, deviceId) {
  return validate({ deviceId: deviceId }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => set(context, deviceId, opcodes.DeleteCards, {}))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = deleteCards

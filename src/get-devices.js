const broadcast = require('./uhppoted.js').broadcast
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function getDevices (ctx) {
  return validate({ }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => broadcast(context, opcodes.GetDevice, {}))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getDevices

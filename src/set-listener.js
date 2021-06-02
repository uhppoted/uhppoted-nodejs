const set = require('./uhppoted.js').set
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function setListener (ctx, deviceId, address, port) {
  return validate({ deviceId: deviceId }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => set(context, deviceId, opcodes.SetListener, { address: address, port: port }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = setListener

const send = require('./uhppoted.js').send
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function setIP (ctx, deviceId, address, netmask, gateway) {
  return validate({ deviceId: deviceId }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => send(context, deviceId, opcodes.SetIP, { address: address, netmask: netmask, gateway: gateway }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = setIP

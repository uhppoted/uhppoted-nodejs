const send = require('./uhppoted.js').send
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate

function setIP (ctx, deviceId, address, netmask, gateway) {
  const initialise = new Promise((resolve, reject) => {
    resolve({
      config: ctx.config,
      locale: ctx.locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return validate({ deviceId: deviceId }, ctx.locale)
    .then(ok => initialise)
    .then(context => send(context, deviceId, opcodes.SetIP, { address: address, netmask: netmask, gateway: gateway }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = setIP

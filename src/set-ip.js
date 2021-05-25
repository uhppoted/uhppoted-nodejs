const send = require('./uhppoted.js').send
const opcodes = require('./opcodes.js')
const errors = require('./errors.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const isValidDeviceId = require('./common.js').isValidDeviceId

function setIP (ctx, deviceId, address, netmask, gateway) {
  const initialise = new Promise((resolve, reject) => {
    if (!isValidDeviceId(deviceId)) {
      reject(errors.InvalidDeviceID(deviceId))
      return
    }

    resolve({
      config: ctx.config,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return initialise
    .then(context => send(context, deviceId, opcodes.SetIP, { address: address, netmask: netmask, gateway: gateway }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = setIP

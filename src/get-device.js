const get = require('./uhppoted.js').get
const opcodes = require('./opcodes.js')
const errors = require('./errors.js')
const translate = require('./internationalisation.js').translate
const log = require('./logger.js')
const isValidDeviceId = require('./common.js').isValidDeviceId

function getDevice (ctx, deviceId) {
  const initialise = new Promise((resolve, reject) => {
    if (!isValidDeviceId(deviceId)) {
      reject(errors.InvalidDeviceID(deviceId, ctx.locale))
      return
    }

    resolve({
      config: ctx.config,
      locale: ctx.locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return initialise
    .then(context => get(context, deviceId, opcodes.GetDevice, {}))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getDevice

const get = require('./uhppoted.js').get
const opcodes = require('./opcodes.js')
const errors = require('./errors.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const isValidDeviceId = require('./common.js').isValidDeviceId

function getStatus (ctx, deviceId) {
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
    .then(context => get(context, deviceId, opcodes.GetStatus, {}))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getStatus

const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const isValidDeviceId = require('./common.js').isValidDeviceId
const isValidCardIndex = require('./common.js').isValidCardIndex

function getCardByIndex (ctx, deviceId, index) {
  const initialise = new Promise((resolve, reject) => {
    if (!isValidDeviceId(deviceId)) {
      reject(new Error(`invalid device ID '${deviceId}'`))
      return
    }

    if (!isValidCardIndex(index)) {
      reject(new Error(`invalid card index '${index}'`))
      return
    }

    resolve({
      config: ctx.config,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return initialise
    .then(context => uhppoted.get(context, deviceId, opcodes.GetCardByIndex, { index: index }))
}

exports = module.exports = getCardByIndex

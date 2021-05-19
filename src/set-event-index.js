const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const isValidDeviceId = require('./common.js').isValidDeviceId
const isValidEventIndex = require('./common.js').isValidEventIndex

function setEventIndex (ctx, deviceId, index) {
  const initialise = new Promise((resolve, reject) => {
    if (!isValidDeviceId(deviceId)) {
      reject(new Error(`invalid device ID '${deviceId}'`))
      return
    }

    if (!isValidEventIndex(index)) {
      reject(new Error(`invalid event index '${index}'`))
      return
    }
    resolve({
      config: ctx.config,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return initialise
    .then(context => uhppoted.set(context, deviceId, opcodes.SetEventIndex, { index: index }))
}

exports = module.exports = setEventIndex

const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const validateDeviceId = require('./common.js').validateDeviceId
const validateEventIndex = require('./common.js').validateEventIndex

function setEventIndex (ctx, deviceId, index) {
  validateDeviceId(deviceId)
  validateEventIndex(index)

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.SetEventIndex, { index: index })
}

exports = module.exports = setEventIndex

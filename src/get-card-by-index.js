const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const validateDeviceId = require('./common.js').validateDeviceId
const validateCardIndex = require('./common.js').validateCardIndex

function getCardByIndex (ctx, deviceId, index) {
  validateDeviceId(deviceId)
  validateCardIndex(index)

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetCardByIndex, { index: index })
}

exports = module.exports = getCardByIndex

const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const common = require('./common.js')

function getCardByIndex (ctx, deviceId, index) {
  if (!common.isValidDeviceId(deviceId)) {
    throw new Error(`invalid device ID ${deviceId}`)
  }

  if (!common.isValidCardIndex(index)) {
    throw new Error(`invalid card index ${index}`)
  }

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetCardByIndex, { index: index })
}

exports = module.exports = getCardByIndex

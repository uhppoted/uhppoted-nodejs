const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function setListener (ctx, deviceId, address, port) {
  if (!deviceId || Number.isNaN(deviceId) || deviceId < 1) {
    throw new Error(`invalid device ID ${deviceId}`)
  }

  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.set(context, deviceId, opcodes.SetListener, { address: address, port: port })
}

exports = module.exports = setListener

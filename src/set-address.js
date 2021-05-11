const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function setAddress (ctx, deviceId, address, netmask, gateway) {
  const context = {
    config: ctx.config
  }

  return uhppoted.send(context, deviceId, opcodes.SetIP, { address: address, netmask: netmask, gateway: gateway })
}

exports = module.exports = setAddress

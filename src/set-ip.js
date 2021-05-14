const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function setIP (ctx, deviceId, address, netmask, gateway) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.send(context, deviceId, opcodes.SetIP, { address: address, netmask: netmask, gateway: gateway })
}

exports = module.exports = setIP
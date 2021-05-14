const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function openDoor (ctx, deviceId, door) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.OpenDoor, { door: door })
}

exports = module.exports = openDoor

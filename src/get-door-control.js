const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function getDoorControl (ctx, deviceId, door) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetDoorControl, { door: door })
}

exports = module.exports = getDoorControl

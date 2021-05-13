const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function getCards (ctx, deviceId) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  return uhppoted.get(context, deviceId, opcodes.GetCards, {})
}

exports = module.exports = getCards

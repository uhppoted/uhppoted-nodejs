const broadcast = require('./uhppoted.js').broadcast
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate

function getDevices (ctx) {
  const initialise = new Promise((resolve, reject) => {
    resolve({
      config: ctx.config,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return initialise
    .then(context => broadcast(context, opcodes.GetDevice, {}))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getDevices

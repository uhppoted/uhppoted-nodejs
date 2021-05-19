const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')

function getDevices (ctx) {
  const initialise = new Promise((resolve, reject) => {
    resolve({
      config: ctx.config,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return initialise
    .then(context => uhppoted.broadcast(context, opcodes.GetDevice, {}))
}

exports = module.exports = getDevices

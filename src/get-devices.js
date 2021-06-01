const broadcast = require('./uhppoted.js').broadcast
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate

function getDevices (ctx) {
  const initialise = new Promise((resolve, reject) => {
    resolve({
      config: ctx.config,
      locale: ctx.locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return validate({ }, ctx.locale)
    .then(ok => initialise)
    .then(context => broadcast(context, opcodes.GetDevice, {}))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getDevices

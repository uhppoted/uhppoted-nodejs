const set = require('./uhppoted.js').set
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate

function setTime (ctx, deviceId, datetime) {
  const initialise = new Promise((resolve, reject) => {
    resolve({
      config: ctx.config,
      locale: ctx.locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return validate({ deviceId: deviceId }, ctx.locale)
    .then(ok => initialise)
    .then(context => set(context, deviceId, opcodes.SetTime, { datetime }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = setTime

const get = require('./uhppoted.js').get
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate

function getDoorControl (ctx, deviceId, door) {
  const initialise = new Promise((resolve, reject) => {
    resolve({
      config: ctx.config,
      locale: ctx.locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  return validate({ deviceId: deviceId, door: door }, ctx.locale)
    .then(ok => initialise)
    .then(context => get(context, deviceId, opcodes.GetDoorControl, { door: door }))
    .then(response => translate(response, ctx.locale))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getDoorControl

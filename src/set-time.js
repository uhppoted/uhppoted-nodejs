const set = require('./driver.js').set
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function setTime (ctx, deviceId, datetime) {
  return validate({ deviceId: deviceId }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => set(context, deviceId, opcodes.SetTime, { datetime }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = setTime

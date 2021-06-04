const get = require('./driver.js').get
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function getTime (ctx, deviceId) {
  return validate({ deviceId: deviceId }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => get(context, deviceId, opcodes.GetTime, {}))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getTime

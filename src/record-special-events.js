const set = require('./driver.js').set
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function recordSpecialEvents (ctx, deviceId, enable) {
  return validate({ deviceId: deviceId }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => set(context, deviceId, opcodes.RecordSpecialEvents, { enable: enable }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = recordSpecialEvents

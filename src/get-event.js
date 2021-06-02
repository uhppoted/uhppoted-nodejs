const get = require('./uhppoted.js').get
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function getEvent (ctx, deviceId, index) {
  return validate({ deviceId: deviceId, eventIndex: index }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => get(context, deviceId, opcodes.GetEvent, { index: index }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getEvent

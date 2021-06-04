const set = require('./driver.js').set
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function setEventIndex (ctx, deviceId, index) {
  return validate({ deviceId: deviceId, eventIndex: index }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => set(context, deviceId, opcodes.SetEventIndex, { index: index }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = setEventIndex

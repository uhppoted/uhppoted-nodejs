const get = require('./driver.js').get
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function getDoorControl (ctx, deviceId, door) {
  return validate({ deviceId: deviceId, door: door }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => get(context, deviceId, opcodes.GetDoorControl, { door: door }))
    .then(response => translate(response, ctx.locale))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getDoorControl

const set = require('./driver.js').set
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function openDoor (ctx, deviceId, door) {
  return validate({ deviceId: deviceId, door: door }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => set(context, deviceId, opcodes.OpenDoor, { door: door }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = openDoor

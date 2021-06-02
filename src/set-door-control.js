const set = require('./uhppoted.js').set
const opcodes = require('./opcodes.js')
const errors = require('./errors.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

function setDoorControl (ctx, deviceId, door, delay, mode) {
  let control = 0x00

  switch (mode) {
    case 'normally open':
      control = opcodes.NormallyOpen
      break

    case 'normally closed':
      control = opcodes.NormallyClosed
      break

    case 'controlled':
      control = opcodes.Controlled
      break

    default:
      throw errors.InvalidDoorControl(mode, ctx.locale)
  }

  return validate({ deviceId: deviceId, door: door }, ctx.locale)
    .then(ok => initialise(ctx))
    .then(context => set(context, deviceId, opcodes.SetDoorControl, { door: door, delay: delay, control: control }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = setDoorControl

const set = require('./uhppoted.js').set
const opcodes = require('./opcodes.js')
const errors = require('./errors.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const validate = require('./common.js').validate

function setDoorControl (ctx, deviceId, door, delay, control) {
  const initialise = new Promise((resolve, reject) => {
    resolve({
      config: ctx.config,
      locale: ctx.locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  let controlv = 0x00

  switch (control) {
    case 'normally open':
      controlv = opcodes.NormallyOpen
      break

    case 'normally closed':
      controlv = opcodes.NormallyClosed
      break

    case 'controlled':
      controlv = opcodes.Controlled
      break

    default:
      throw errors.InvalidDoorControl(control, ctx.locale)
  }

  return validate({ deviceId: deviceId, door: door }, ctx.locale)
    .then(ok => initialise)
    .then(context => set(context, deviceId, opcodes.SetDoorControl, { door: door, delay: delay, control: controlv }))
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = setDoorControl

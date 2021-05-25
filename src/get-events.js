const get = require('./uhppoted.js').get
const opcodes = require('./opcodes.js')
const errors = require('./errors.js')
const log = require('./logger.js')
const translate = require('./internationalisation.js').translate
const isValidDeviceId = require('./common.js').isValidDeviceId

function getEvents (ctx, deviceId) {
  const initialise = new Promise((resolve, reject) => {
    if (!isValidDeviceId(deviceId)) {
      reject(errors.InvalidDeviceID(deviceId))
      return
    }

    resolve({
      config: ctx.config,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  const first = initialise
    .then(context => get(context, deviceId, opcodes.GetEvent, { index: 0 }))

  const last = initialise
    .then(context => get(context, deviceId, opcodes.GetEvent, { index: 0xffffffff }))

  const promise = Promise.all([first, last]).then(([p, q]) => {
    const object = { first: 0, last: 0 }

    if (p && p.event) {
      object.first = p.event.index
    }

    if (q && q.event) {
      object.last = q.event.index
    }

    return object
  })

  return promise
    .then(response => translate(response, ctx.locale))
}

exports = module.exports = getEvents

const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')
const log = require('./logger.js')
const isValidDeviceId = require('./common.js').isValidDeviceId

function getEvents (ctx, deviceId) {
  const initialise = new Promise((resolve, reject) => {
    if (!isValidDeviceId(deviceId)) {
      reject(new Error(`invalid device ID '${deviceId}'`))
      return
    }

    resolve({
      config: ctx.config,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })

  const first = initialise
    .then(context => uhppoted.get(context, deviceId, opcodes.GetEvent, { index: 0 }))

  const last = initialise
    .then(context => uhppoted.get(context, deviceId, opcodes.GetEvent, { index: 0xffffffff }))

  return Promise.all([first, last]).then(([p, q]) => {
    const object = { first: 0, last: 0 }

    if (p && p.event) {
      object.first = p.event.index
    }

    if (q && q.event) {
      object.last = q.event.index
    }

    return object
  })
}

exports = module.exports = getEvents

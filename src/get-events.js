const uhppoted = require('./uhppoted.js')
const opcodes = require('./opcodes.js')

function getEvents (ctx, deviceId) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  const first = uhppoted.get(context, deviceId, opcodes.GetEvent, { index: 0 })
  const last = uhppoted.get(context, deviceId, opcodes.GetEvent, { index: 0xffffffff })

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

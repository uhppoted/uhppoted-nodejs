const process = require('node:process')
const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const onEvent = function (event) {
  console.log(
    event.state.event.timestamp,
    event.deviceId,
    event.state.event.type.event,
    event.state.event.card,
    event.state.event.door,
    event.state.event.reason.reason,
  )
}

const onError = function (err) {
  console.log(`\n   *** ERROR ${err.message}\n`)
}

const listener = uhppoted.listen(ctx, onEvent, onError)

if (listener) {
  console.log('\n  *** CTRL-C to exit ...\n')

  process.openStdin().addListener('listener', function (d) {
    if (d.toString().trim() === 'exit') {
      listener.close()
      process.exit(0)
    }
  })
}

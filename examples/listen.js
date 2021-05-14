const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const onEvent = function (event) {
  console.log(
    event.state.event.timestamp,
    event.deviceId,
    event.state.event.type.event,
    event.state.event.card,
    event.state.event.door,
    event.state.event.reason.reason)
}

const onError = function (err) {
  console.log('ERROR:', err)
}

const listener = uhppoted.listen(ctx, onEvent, onError)

if (listener) {
  console.log("\n  Type 'exit' to stop event listener...\n")
  process
    .openStdin()
    .addListener('data', function (d) {
      if (d.toString().trim() === 'exit') {
        listener.close()
        process.exit(0)
      }
    })
}

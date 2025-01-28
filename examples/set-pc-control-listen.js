const process = require('node:process')
const uhppoted = require('uhppoted')
const ctx = require('./common.js')

ctx.config.debug = false

const deviceID = 405419896
const cards = [8165538, 10058399]

const onEvent = function (event) {
  const controller = event.state.serialNumber
  const eventType = event.state.event.type.code
  const granted = event.state.event.granted
  const reason = event.state.event.reason.code
  const card = event.state.event.card
  const door = event.state.event.door

  console.log(
    'event           ',
    event.deviceId,
    event.state.event.timestamp,
    event.state.event.type.event,
    event.state.event.card,
    event.state.event.door,
    event.state.event.reason.reason,
  )

  // card swipe and remote access control?
  if (eventType === 1 && !granted && reason === 5) {
    if (cards.includes(card)) {
      console.log('access granted  ', controller, card, door)
    } else {
      console.log('access denied   ', controller, card, door)
    }

    if (cards.includes(card)) {
      uhppoted
        .openDoor(ctx, controller, door)
        .then((response) => {
          console.log(
            'open-door       ',
            response.deviceId,
            door,
            response.opened ? 'opened' : 'error',
          )
        })
        .catch((err) => {
          console.log(`\n   *** ERROR ${err.message}\n`)
        })
    }
  }
}

const onRefresh = function () {
  uhppoted
    .getTime(ctx, deviceID)
    .then((response) => {
      console.log('get-time        ', response.deviceId, response.datetime)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

const onError = function (err) {
  console.log(`\n   *** ERROR ${err.message}\n`)
}

const listener = uhppoted.listen(ctx, onEvent, onError)

if (listener) {
  uhppoted
    .setPCControl(ctx, deviceID, true)
    .then((response) => {
      console.log(
        'set-pc-control  ',
        response.deviceId,
        response.ok ? 'ok' : 'error',
      )
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  setInterval(onRefresh, 15000)

  console.log('\n  *** CTRL-C to exit ...\n')

  process.openStdin().addListener('listener', function (d) {
    if (d.toString().trim() === 'exit') {
      listener.close()
      process.exit(0)
    }
  })
}

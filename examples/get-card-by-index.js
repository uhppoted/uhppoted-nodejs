const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const index = 3

async function run () {
  await uhppoted.getCardByIndex(ctx, deviceID, index)
    .then(response => {
      switch (response.card.number) {
        case 0:
          console.log(`get-card-by-index: card @${index} not found`)
          break

        case 0xffffffff:
          console.log(`get-card-by-index: card @${index} deleted`)
          break

        default:
          console.log('\nget-card-by-index:\n', response)
      }
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.getCardByIndex(ctx, { controller: deviceID, address: addr, protocol: 'tcp' }, index)
    .then(response => {
      switch (response.card.number) {
        case 0:
          console.log(`get-card-by-index: card @${index} not found`)
          break

        case 0xffffffff:
          console.log(`get-card-by-index: card @${index} deleted`)
          break

        default:
          console.log('\nget-card-by-index:\n', response)
      }
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

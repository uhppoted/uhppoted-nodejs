const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const card = 8165538

async function run () {
  await uhppoted.getCard(ctx, deviceID, card)
    .then(response => {
      switch (response.card.number) {
        case 0:
          console.log(`get-card: card ${card} not found`)
          break

        case 0xffffffff:
          console.log(`get-card: card ${card} deleted`)
          break

        default:
          console.log('\nget-card:\n', response)
      }
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.getCard(ctx, { id: deviceID, address: addr, protocol: 'tcp' }, card)
    .then(response => {
      switch (response.card.number) {
        case 0:
          console.log(`get-card: card ${card} not found`)
          break

        case 0xffffffff:
          console.log(`get-card: card ${card} deleted`)
          break

        default:
          console.log('\nget-card:\n', response)
      }
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

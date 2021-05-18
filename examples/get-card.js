const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const card = 8165538

try {
  uhppoted.getCard(ctx, deviceID, card)
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
      console.log(err.toString())
    })
} catch (err) {
  console.log(err.toString())
}

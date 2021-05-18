const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const index = 2

uhppoted.getCardByIndex(ctx, deviceID, index)
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
  .catch(err => console.log(err))

const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const card = 8165538

uhppoted.getCard(ctx, 405419896, card)
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
  .catch(err => console.log('ERROR', err))

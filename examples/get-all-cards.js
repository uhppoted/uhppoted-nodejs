const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const deviceID = 405419896
const MAX = 20000

ctx.config.debug = false

function getCards () {
  return uhppoted.getCards(ctx, deviceID)
    .then(response => {
      return response.cards
    })
}

function getCard (index) {
  return uhppoted.getCardByIndex(ctx, deviceID, index)
    .then((response) => {
      return response.card
    })
}

function getAllCards () {
  (async function loop () {
    const N = await getCards()
    const cards = []
    let index = 1

    while (cards.length < N && index < MAX) {
      const card = await getCard(index)

      // .. ignore 'not found' and 'deleted'
      if (card && card.number !== 0 && card.number !== 0xffffffff) {
        cards.push(card)
      }

      index++
    }

    console.log(cards)
  })()
}

getAllCards()

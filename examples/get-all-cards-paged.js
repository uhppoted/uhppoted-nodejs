const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const deviceID = 405419896
const MAX = 20000

ctx.config.debug = false

function getCards() {
  return uhppoted.getCards(ctx, deviceID).then((response) => {
    return response.cards
  })
}

function getCard(index) {
  return uhppoted.getCardByIndex(ctx, deviceID, index).then((response) => {
    return response.card
  })
}

async function* generator() {
  const N = await getCards()
  let count = 0
  let index = 0

  while (count < N && index < MAX) {
    index++

    const card = await getCard(index)

    // .. ignore 'not found' and 'deleted'
    if (card && card.number !== 0 && card.number !== 0xffffffff) {
      count++
      yield card
    }
  }
}

async function* pager(pagesize) {
  const g = generator()
  let cards = []

  for await (const it of g) {
    cards.push(it)

    if (cards.length >= pagesize) {
      yield cards
      cards = []
    }
  }

  if (cards.length > 0) {
    yield cards
  }
}

async function getAllCards() {
  const g = pager(4)
  let page = 0
  let N = 0

  for await (const it of g) {
    page += 1
    N += it.length

    console.log(`page ${page}`, it)
  }

  console.log(`TOTAL: ${N}`)
}

getAllCards()

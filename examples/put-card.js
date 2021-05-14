const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const cardNumber = '123456789'
const validFrom = '2020-01-01'
const validUntil = '2025-01-01'
const doors = { 1: true, 2: false, 3: true, 4: true }

uhppoted.putCard(ctx, 405419896, cardNumber, validFrom, validUntil, doors)
  .then(response => {
    console.log(response)
  })
  .catch(err => console.log('ERROR', err))

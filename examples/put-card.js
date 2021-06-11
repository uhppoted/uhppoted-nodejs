const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const cardNumber = '8165538'
const validFrom = '2021-01-01'
const validUntil = '2021-12-31'
const doors = { 1: true, 2: false, 3: 29, 4: true }

uhppoted.putCard(ctx, deviceID, cardNumber, validFrom, validUntil, doors)
  .then(response => {
    console.log('\nput-card:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

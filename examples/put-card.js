const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const cardNumber = '8165538'
const validFrom = '2023-01-01'
const validUntil = '2023-12-31'
const doors = { 1: true, 2: false, 3: 29, 4: true }
const PIN = 7531

uhppoted.putCard(ctx, deviceID, cardNumber, validFrom, validUntil, doors, PIN)
  .then(response => {
    console.log('\nput-card:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

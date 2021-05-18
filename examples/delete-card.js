const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const card = 8165538

uhppoted.deleteCard(ctx, deviceID, card)
  .then(response => console.log('\ndelete-card:\n', response))
  .catch(err => console.log(err))

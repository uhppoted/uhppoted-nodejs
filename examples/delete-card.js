const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const card = 8165538

uhppoted.deleteCard(ctx, 405419896, card)
  .then(response => console.log('\ndelete-card:\n', response))
  .catch(err => console.log('ERROR', err))

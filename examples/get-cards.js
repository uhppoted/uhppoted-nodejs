const uhppoted = require('uhppoted')
const ctx = require('./common.js')

uhppoted.getCards(ctx, 405419896)
  .then(response => console.log('\nget-cards:\n', response))
  .catch(err => console.log('ERROR', err))

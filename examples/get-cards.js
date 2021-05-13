const ctx = require('./common.js')
const uhppoted = require('../index.js')

uhppoted.getCards(ctx, 405419896)
  .then(response => console.log('\nget-cards:\n', response))
  .catch(err => console.log('ERROR', err))

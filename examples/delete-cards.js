const ctx = require('./common.js')
const uhppoted = require('../index.js')

uhppoted.deleteCards(ctx, 405419896)
  .then(response => console.log('\ndelete-cards:\n', response))
  .catch(err => console.log('ERROR', err))

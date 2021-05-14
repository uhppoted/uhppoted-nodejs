const uhppoted = require('uhppoted')
const ctx = require('./common.js')

uhppoted.deleteCards(ctx, 405419896)
  .then(response => console.log('\ndelete-cards:\n', response))
  .catch(err => console.log('ERROR', err))

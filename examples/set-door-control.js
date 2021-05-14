const ctx = require('./common.js')
const uhppoted = require('../index.js')

uhppoted.setDoorControl(ctx, 405419896, 3, 4, 'normally closed')
  .then(response => console.log('\nset-door-control:\n', response))
  .catch(err => console.log('ERROR', err))
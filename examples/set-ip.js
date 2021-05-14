const uhppoted = require('uhppoted')
const ctx = require('./common.js')

uhppoted.setIP(ctx, 405419896, '192.168.1.100', '255.255.255.0', '192.168.1.1')
  .then(response => console.log('\nset-IP:\n', response))
  .catch(err => console.log('ERROR', err))

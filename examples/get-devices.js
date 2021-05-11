const uhppoted = require('../index.js')

const config = new uhppoted.Config('uhppoted', '192.168.1.100', '192.168.1.255:60000', '192.168.1.100:60001', true)
const ctx = {
  config: config
}

// ... get-devices
uhppoted.getDevices(ctx)
  .then(response => console.log('\nget-devices:\n', response))
  .catch(err => console.log('ERROR', err))

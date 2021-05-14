const uhppoted = require('uhppoted')

const config = new uhppoted.Config('uhppoted', '192.168.1.100', '192.168.1.255:60000', '192.168.1.100:60001', true)
const ctx = {
  config: config
}

exports = module.exports = ctx

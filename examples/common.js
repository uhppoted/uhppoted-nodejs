const process = require('node:process')
const uhppoted = require('uhppoted')

const controllers = [
  {
    deviceId: 201020304,
    address: '192.168.1.100:59999',
    forceBroadcast: true,
  },
]

let bind = '0.0.0.0'
let broadcast = '255.255.255.255:60000'
let listen = '0.0.0.0:60001'
let timeout = 5000
let debug = false

// Override default configuration with command line values
const args = process.argv.slice(2)

args.forEach((arg) => {
  const re = /(bind|broadcast|listen|timeout|debug)=(.*)/gm
  const matches = re.exec(arg)

  if (matches && matches.length === 3) {
    switch (matches[1]) {
      case 'bind':
        bind = matches[2]
        break

      case 'broadcast':
        broadcast = matches[2]
        break

      case 'listen':
        listen = matches[2]
        break

      case 'timeout':
        timeout = parseInt(matches[2])
        break

      case 'debug':
        debug = matches[2] === 'true'
        break
    }
  }
})

exports = module.exports = {
  config: new uhppoted.Config(
    'examples',
    bind,
    broadcast,
    listen,
    timeout,
    controllers,
    debug,
  ),
}

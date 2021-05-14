const uhppoted = require('uhppoted')

let bind = '0.0.0.0'
let broadcast = '255.255.255.255:60000'
let listen = '0.0.0.0:60001'
let debug = false

// Override default bind, broadcast and listen address with command line values
const args = process.argv.slice(2)

args.forEach(arg => {
  const re = /(bind|broadcast|listen|debug)=(.*)/gm
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

      case 'debug':
        debug = matches[2] === 'true'
        break
    }
  }
})

exports = module.exports = {
  config: new uhppoted.Config('uhppoted', bind, broadcast, listen, debug)
}

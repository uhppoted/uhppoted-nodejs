const expect = require('chai').expect
const dgram = require('dgram')
const uhppoted = require('../index.js')

const bind = '0.0.0.0'
const listen = '0.0.0.0:60001'
let broadcast = '255.255.255.255:59999'

process.argv.slice(3).forEach(arg => {
  const re = /(--broadcast)=(.*)/gm
  const matches = re.exec(arg)

  if (matches && matches.length === 3) {
    switch (matches[1]) {
      case '--broadcast':
        broadcast = matches[2]
        break
    }
  }
})

const ctx = {
  config: new uhppoted.Config('integration-tests', bind, broadcast, listen, 500, [], false)
}

function setup (request, replies) {
  const sock = dgram.createSocket({ type: 'udp4', reuseAddr: true })

  sock.on('message', (message, rinfo) => {
    expect(message).to.deep.equal(request)
    replies.forEach(reply => {
      sock.send(new Uint8Array(reply), 0, 64, rinfo.port, rinfo.address)
    })
  })

  sock.bind({ address: '0.0.0.0', port: 59999 })

  return sock
}

function teardown (sock) {
  sock.close()
}

module.exports = {
  context: ctx,
  setup: setup,
  teardown: teardown
}

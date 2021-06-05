const expect = require('chai').expect
const dgram = require('dgram')
const uhppoted = require('../index.js')
const ip = require('ip')

const addr = ip.address()
const subnet = ip.subnet(addr, '255.255.0.0')

const bind = addr
let broadcast = subnet.broadcastAddress + ':59999'
let listen = '0.0.0.0:60001'

process.argv.slice(3).forEach(arg => {
  const re = /(--broadcast|--listen)=(.*)/gm
  const matches = re.exec(arg)

  if (matches && matches.length === 3) {
    switch (matches[1]) {
      case '--broadcast':
        broadcast = matches[2]
        break

      case '--listen':
        listen = matches[2]
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

function stringToIP (addr) {
  let address = addr
  let port = 60000

  const re = /^(.*?)(?::([0-9]+))?$/
  const match = addr.match(re)

  if ((match.length > 1) && match[1]) {
    address = match[1]
  }

  if ((match.length > 2) && match[2]) {
    port = parseInt(match[2], 10)
  }

  return {
    address: address,
    port: port
  }
}

module.exports = {
  context: ctx,
  setup: setup,
  teardown: teardown,
  stringToIP: stringToIP
}

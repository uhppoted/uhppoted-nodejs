const process = require('node:process')
const expect = require('chai').expect
const dgram = require('dgram')
const net = require('net')
const uhppoted = require('../index.js')
const ipx = require('../src/ipx.js')
const os = require('os')
const interfaces = os.networkInterfaces()

let bind = '0.0.0.0'
let broadcast = '255.255.255.255:59999'
let listen = '0.0.0.0:60001'

for (const name of Object.keys(interfaces)) {
  for (const network of interfaces[name]) {
    if (network.family === 'IPv4' && !network.internal) {
      broadcast = ipx.broadcastAddr(network.address, network.netmask)
    }
  }
}

process.argv.slice(3).forEach((arg) => {
  const re = /(--broadcast|--listen)=(.*)/gm
  const matches = re.exec(arg)

  if (matches && matches.length === 3) {
    switch (matches[1]) {
      case '--bind':
        bind = matches[2]
        break

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
  config: new uhppoted.Config('integration-tests', bind, broadcast, listen, 500, [], false),
}

function setup(request, replies, protocol = 'udp') {
  if (protocol === 'tcp') {
    const sock = net.createServer((c) => {
      c.on('data', (message) => {
        expect(message).to.deep.equal(request)
        replies.forEach((reply) => {
          c.write(new Uint8Array(reply))
        })
      })
    })

    sock.listen(59998)

    return sock
  }

  if (protocol === 'udp') {
    const sock = dgram.createSocket({ type: 'udp4', reuseAddr: true })

    sock.on('message', (message, rinfo) => {
      expect(message).to.deep.equal(request)
      replies.forEach((reply) => {
        sock.send(new Uint8Array(reply), 0, 64, rinfo.port, rinfo.address)
      })
    })

    sock.bind({ address: '0.0.0.0', port: 59999 })

    return sock
  }

  return null
}

function teardown(sock) {
  sock.close()
}

function stringToIP(addr) {
  let address = addr
  let port = 60000

  const re = /^(.*?)(?::([0-9]+))?$/
  const match = addr.match(re)

  if (match.length > 1 && match[1]) {
    address = match[1]
  }

  if (match.length > 2 && match[2]) {
    port = parseInt(match[2], 10)
  }

  return {
    address,
    port,
  }
}

module.exports = {
  context: ctx,
  setup,
  teardown,
  stringToIP,
}

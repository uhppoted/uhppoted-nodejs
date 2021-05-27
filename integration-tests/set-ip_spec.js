const describe = require('mocha').describe
const before = require('mocha').before
const after = require('mocha').after
const it = require('mocha').it
const expect = require('chai').expect

const dgram = require('dgram')
const uhppoted = require('../index.js')

const request = Buffer.from([
  0x17, 0x96, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0xc0, 0xa8, 0x01, 0x64, 0xff, 0xff, 0xff, 0x00,
  0xc0, 0xa8, 0x01, 0x01, 0x55, 0xaa, 0xaa, 0x55, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
])

describe('#setIP(...)', function () {
  let sock = null
  const bind = '0.0.0.0'
  const listen = '0.0.0.0:60001'
  let broadcast = '255.255.255.255:59999'

  before(function () {
    const args = process.argv.slice(3)

    args.forEach(arg => {
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

    sock = dgram.createSocket({ type: 'udp4', reuseAddr: true })

    sock.on('message', (message, rinfo) => {
      expect(message).to.deep.equal(request)
    })

    sock.bind({ address: '0.0.0.0', port: 59999 })
  })

  after(function () {
    sock.close()
  })

  it('should execute set-ip', function (done) {
    const expected = {}

    const config = new uhppoted.Config('integration-tests', bind, broadcast, listen, 5000, [], false)
    const ctx = { config: config }

    uhppoted.setIP(ctx, 405419896, '192.168.1.100', '255.255.255.0', '192.168.1.1')
      .then(response => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch(err => done(err))
  })
})

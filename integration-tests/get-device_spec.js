const describe = require('mocha').describe
const before = require('mocha').before
const after = require('mocha').after
const it = require('mocha').it
const expect = require('chai').expect

const dgram = require('dgram')
const uhppoted = require('../index.js')

describe('#getDevice(...)', function () {
  const reply = Buffer.from([
    0x17, 0x94, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0xc0, 0xa8, 0x01, 0x64, 0xff, 0xff, 0xff, 0x00,
    0xc0, 0xa8, 0x01, 0x01, 0x00, 0x12, 0x23, 0x34, 0x45, 0x56, 0x08, 0x92, 0x20, 0x18, 0x11, 0x05,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ])

  let sock = null
  const bind = '0.0.0.0'
  const listen = '0.0.0.0:60001'
  let broadcast = '255.255.255.255:60000'

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
      sock.send(new Uint8Array(reply), 0, 64, rinfo.port, rinfo.address)
    })

    sock.bind({ address: '0.0.0.0', port: 60000 })
  })

  after(function () {
    sock.close()
  })

  it('should execute get-device', function (done) {
    const expected = {
      deviceId: 405419896,
      device: {
        serialNumber: 405419896,
        address: '192.168.1.100',
        netmask: '255.255.255.0',
        gateway: '192.168.1.1',
        MAC: '00:12:23:34:45:56',
        version: '0892',
        date: '2018-11-05'
      }
    }

    const config = new uhppoted.Config('integration-tests', bind, broadcast, listen, 5000, [], false)
    const ctx = { config: config }

    uhppoted.getDevice(ctx, 405419896)
      .then(response => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch(err => done(err))
  })
})

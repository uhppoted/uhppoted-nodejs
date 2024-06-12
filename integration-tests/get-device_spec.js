const describe = require('mocha').describe
const before = require('mocha').before
const after = require('mocha').after
const it = require('mocha').it
const expect = require('chai').expect

const uhppoted = require('../index.js')
const ctx = require('./common.js').context
const setup = require('./common.js').setup
const teardown = require('./common.js').teardown

const request = Buffer.from([
  0x17, 0x94, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
])

const reply = Buffer.from([
  0x17, 0x94, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0xc0, 0xa8, 0x01, 0x64, 0xff, 0xff, 0xff, 0x00,
  0xc0, 0xa8, 0x01, 0x01, 0x00, 0x12, 0x23, 0x34, 0x45, 0x56, 0x08, 0x92, 0x20, 0x18, 0x11, 0x05,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
])

describe('#getDevice(...)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply], 'udp')
  })

  after(function () {
    teardown(sock)
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

    uhppoted.getDevice(ctx, 405419896)
      .then(response => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch(err => done(err))
  })
})

describe('#getDevice(...) (TCP)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply], 'tcp')
  })

  after(function () {
    teardown(sock)
  })

  it('should execute get-device using TCP with address:port object', function (done) {
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

    uhppoted.getDevice(ctx, { id: 405419896, address: { address: '127.0.0.1', port: 59998 }, protocol: 'tcp' })
      .then(response => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch(err => done(err))
  })

  it('should execute get-device using TCP with address:port string', function (done) {
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

    uhppoted.getDevice(ctx, { id: 405419896, address: '127.0.0.1:59998', protocol: 'tcp' })
      .then(response => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch(err => done(err))
  })
})

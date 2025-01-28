const { Buffer } = require('node:buffer')

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
  0x17, 0x96, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0xc0, 0xa8, 0x01, 0x64, 0xff,
  0xff, 0xff, 0x00, 0xc0, 0xa8, 0x01, 0x01, 0x55, 0xaa, 0xaa, 0x55, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

describe('#setIP(...)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [])
  })

  after(function () {
    teardown(sock)
  })

  it('should execute set-ip', function (done) {
    const expected = {}

    uhppoted
      .setIP(ctx, 405419896, '192.168.1.100', '255.255.255.0', '192.168.1.1')
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

describe('#setIP(...) (TCP)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [], 'tcp')
  })

  after(function () {
    teardown(sock)
  })

  it('should execute set-IP using TCP with address:port object', function (done) {
    const expected = {}

    uhppoted
      .setIP(
        ctx,
        {
          id: 405419896,
          address: { address: '127.0.0.1', port: 59998 },
          protocol: 'tcp',
        },
        '192.168.1.100',
        '255.255.255.0',
        '192.168.1.1',
      )
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })

  it('should execute set-IP using TCP with address:port string', function (done) {
    const expected = {}

    uhppoted
      .setIP(
        ctx,
        { id: 405419896, address: '127.0.0.1:59998', protocol: 'tcp' },
        '192.168.1.100',
        '255.255.255.0',
        '192.168.1.1',
      )
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

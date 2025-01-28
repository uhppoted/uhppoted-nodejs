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
  0x17, 0x30, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x20, 0x21, 0x05, 0x28, 0x14,
  0x56, 0x14, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

const reply = Buffer.from([
  0x17, 0x30, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x20, 0x21, 0x05, 0x28, 0x14,
  0x56, 0x14, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

describe('#setTime(...)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply])
  })

  after(function () {
    teardown(sock)
  })

  it('should execute set-time', function (done) {
    const expected = {
      deviceId: 405419896,
      datetime: '2021-05-28 14:56:14',
    }

    uhppoted
      .setTime(ctx, 405419896, '2021-05-28 14:56:14')
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

describe('#setTime(...) (TCP)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply], 'tcp')
  })

  after(function () {
    teardown(sock)
  })

  it('should execute set-time using TCP with address:port object', function (done) {
    const expected = {
      deviceId: 405419896,
      datetime: '2021-05-28 14:56:14',
    }

    uhppoted
      .setTime(
        ctx,
        {
          id: 405419896,
          address: { address: '127.0.0.1', port: 59998 },
          protocol: 'tcp',
        },
        '2021-05-28 14:56:14',
      )
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })

  it('should execute set-time using TCP with address:port string', function (done) {
    const expected = {
      deviceId: 405419896,
      datetime: '2021-05-28 14:56:14',
    }

    uhppoted
      .setTime(
        ctx,
        { id: 405419896, address: '127.0.0.1:59998', protocol: 'tcp' },
        '2021-05-28 14:56:14',
      )
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

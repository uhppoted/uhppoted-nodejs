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

const request1 = Buffer.from([
  0x17, 0x50, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x15, 0xcd, 0x5b, 0x07, 0x20, 0x23, 0x01, 0x01, 0x20, 0x25, 0x12, 0x31, 0x01, 0x00, 0x1d,
  0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

const reply1 = Buffer.from([
  0x17, 0x50, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

const request2 = Buffer.from([
  0x17, 0x50, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x15, 0xcd, 0x5b, 0x07, 0x20, 0x23, 0x01, 0x01, 0x20, 0x25, 0x12, 0x31, 0x01, 0x00, 0x1d,
  0x01, 0x6b, 0x1d, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

const reply2 = Buffer.from([
  0x17, 0x50, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

describe('#putCard(...)', function () {
  let sock = null

  before(function () {
    sock = setup(request1, [reply1])
  })

  after(function () {
    teardown(sock)
  })

  it('should execute put-card', function (done) {
    const expected = {
      deviceId: 405419896,
      stored: true,
    }

    uhppoted
      .putCard(ctx, 405419896, 123456789, '2023-01-01', '2025-12-31', {
        1: true,
        2: false,
        3: 29,
        4: true,
      })
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

describe('#putCard(...) with PIN', function () {
  let sock = null

  before(function () {
    sock = setup(request2, [reply2])
  })

  after(function () {
    teardown(sock)
  })

  it('should execute put-card (with PIN)', function (done) {
    const expected = {
      deviceId: 405419896,
      stored: true,
    }

    uhppoted
      .putCard(ctx, 405419896, 123456789, '2023-01-01', '2025-12-31', { 1: true, 2: false, 3: 29, 4: true }, 7531)
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

describe('#putCard(...) (TCP)', function () {
  let sock = null

  before(function () {
    sock = setup(request1, [reply1], 'tcp')
  })

  after(function () {
    teardown(sock)
  })

  it('should execute put-card using TCP with address:port object', function (done) {
    const expected = {
      deviceId: 405419896,
      stored: true,
    }

    uhppoted
      .putCard(
        ctx,
        {
          id: 405419896,
          address: { address: '127.0.0.1', port: 59998 },
          protocol: 'tcp',
        },
        123456789,
        '2023-01-01',
        '2025-12-31',
        { 1: true, 2: false, 3: 29, 4: true },
      )
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })

  it('should execute put-card using TCP with address:port string', function (done) {
    const expected = {
      deviceId: 405419896,
      stored: true,
    }

    uhppoted
      .putCard(ctx, { id: 405419896, address: '127.0.0.1:59998', protocol: 'tcp' }, 123456789, '2023-01-01', '2025-12-31', {
        1: true,
        2: false,
        3: 29,
        4: true,
      })
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

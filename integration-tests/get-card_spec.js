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
  0x17, 0x5a, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0xa2, 0x98, 0x7c, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

const reply = Buffer.from([
  0x17, 0x5a, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0xa2, 0x98, 0x7c, 0x00, 0x20,
  0x23, 0x01, 0x01, 0x20, 0x23, 0x12, 0x31, 0x01, 0x00, 0x1d, 0x01, 0x6b, 0x1d,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

describe('#getCard(...)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply])
  })

  after(function () {
    teardown(sock)
  })

  it('should execute get-card', function (done) {
    const expected = {
      deviceId: 405419896,
      card: {
        number: 8165538,
        valid: {
          from: '2023-01-01',
          to: '2023-12-31',
        },
        doors: {
          1: true,
          2: false,
          3: 29,
          4: true,
        },
        PIN: 7531,
      },
    }

    uhppoted
      .getCard(ctx, 405419896, 8165538)
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

describe('#getCard(...) (TCP)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply], 'tcp')
  })

  after(function () {
    teardown(sock)
  })

  it('should execute get-card using TCP with address:port object', function (done) {
    const expected = {
      deviceId: 405419896,
      card: {
        number: 8165538,
        valid: {
          from: '2023-01-01',
          to: '2023-12-31',
        },
        doors: {
          1: true,
          2: false,
          3: 29,
          4: true,
        },
        PIN: 7531,
      },
    }

    uhppoted
      .getCard(
        ctx,
        {
          id: 405419896,
          address: { address: '127.0.0.1', port: 59998 },
          protocol: 'tcp',
        },
        8165538,
      )
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })

  it('should execute get-card using TCP with address:port string', function (done) {
    const expected = {
      deviceId: 405419896,
      card: {
        number: 8165538,
        valid: {
          from: '2023-01-01',
          to: '2023-12-31',
        },
        doors: {
          1: true,
          2: false,
          3: 29,
          4: true,
        },
        PIN: 7531,
      },
    }

    uhppoted
      .getCard(
        ctx,
        { id: 405419896, address: '127.0.0.1:59998', protocol: 'tcp' },
        8165538,
      )
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

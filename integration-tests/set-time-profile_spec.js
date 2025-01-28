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
  0x17, 0x88, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x1d, 0x20, 0x21, 0x01, 0x01,
  0x20, 0x21, 0x12, 0x31, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x08, 0x30,
  0x11, 0x45, 0x13, 0x15, 0x17, 0x25, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

const reply = Buffer.from([
  0x17, 0x88, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x01, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

describe('#setTimeProfile(...)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply])
  })

  after(function () {
    teardown(sock)
  })

  it('should execute set-time-profile', function (done) {
    const expected = {
      deviceId: 405419896,
      updated: true,
    }

    const profile = {
      id: 29,
      valid: { from: '2021-01-01', to: '2021-12-31' },
      weekdays: ['Monday', 'Wednesday', 'Friday'],
      segments: [
        { start: '08:30', end: '11:45' },
        { start: '13:15', end: '17:25' },
      ],
      linkedTo: 3,
    }

    uhppoted
      .setTimeProfile(ctx, 405419896, profile)
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

describe('#setTimeProfile(...) (TCP)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply], 'tcp')
  })

  after(function () {
    teardown(sock)
  })

  it('should execute set-time-profile with address:port object', function (done) {
    const expected = {
      deviceId: 405419896,
      updated: true,
    }

    const profile = {
      id: 29,
      valid: { from: '2021-01-01', to: '2021-12-31' },
      weekdays: ['Monday', 'Wednesday', 'Friday'],
      segments: [
        { start: '08:30', end: '11:45' },
        { start: '13:15', end: '17:25' },
      ],
      linkedTo: 3,
    }

    uhppoted
      .setTimeProfile(
        ctx,
        {
          id: 405419896,
          address: { address: '127.0.0.1', port: 59998 },
          protocol: 'tcp',
        },
        profile,
      )
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })

  it('should execute set-time-profile with address:port string', function (done) {
    const expected = {
      deviceId: 405419896,
      updated: true,
    }

    const profile = {
      id: 29,
      valid: { from: '2021-01-01', to: '2021-12-31' },
      weekdays: ['Monday', 'Wednesday', 'Friday'],
      segments: [
        { start: '08:30', end: '11:45' },
        { start: '13:15', end: '17:25' },
      ],
      linkedTo: 3,
    }

    uhppoted
      .setTimeProfile(
        ctx,
        { id: 405419896, address: '127.0.0.1:59998', protocol: 'tcp' },
        profile,
      )
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

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
  0x17, 0x20, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

const reply = Buffer.from([
  0x17, 0x20, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x45, 0x00, 0x00, 0x00, 0x02, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x20, 0x19, 0x08,
  0x10, 0x10, 0x28, 0x32, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x15, 0x14, 0x46, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x21, 0x05, 0x28, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

describe('#getStatus(...)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply])
  })

  after(function () {
    teardown(sock)
  })

  it('should execute get-status', function (done) {
    const expected = {
      deviceId: 405419896,
      state: {
        serialNumber: 405419896,
        event: {
          index: 69,
          type: {
            code: 2,
            event: 'door',
          },
          granted: true,
          door: 1,
          direction: {
            code: 1,
            direction: 'in',
          },
          card: 0,
          timestamp: '2019-08-10 10:28:32',
          reason: {
            code: 44,
            reason: 'remote open door',
          },
        },
        doors: { 1: false, 2: false, 3: false, 4: false },
        buttons: { 1: false, 2: false, 3: false, 4: false },
        system: { status: 0, date: '2021-05-28', time: '15:14:46' },
        specialInfo: 0,
        relays: {
          state: 0,
          relays: {
            1: false,
            2: false,
            3: false,
            4: false,
          },
        },
        inputs: { state: 0, forceLock: false, fireAlarm: false },
      },
    }

    uhppoted
      .getStatus(ctx, 405419896)
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

describe('#getStatus(...) (TCP)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply], 'tcp')
  })

  after(function () {
    teardown(sock)
  })

  it('should execute get-status using TCP with address:port object', function (done) {
    const expected = {
      deviceId: 405419896,
      state: {
        serialNumber: 405419896,
        event: {
          index: 69,
          type: {
            code: 2,
            event: 'door',
          },
          granted: true,
          door: 1,
          direction: {
            code: 1,
            direction: 'in',
          },
          card: 0,
          timestamp: '2019-08-10 10:28:32',
          reason: {
            code: 44,
            reason: 'remote open door',
          },
        },
        doors: { 1: false, 2: false, 3: false, 4: false },
        buttons: { 1: false, 2: false, 3: false, 4: false },
        system: { status: 0, date: '2021-05-28', time: '15:14:46' },
        specialInfo: 0,
        relays: {
          state: 0,
          relays: {
            1: false,
            2: false,
            3: false,
            4: false,
          },
        },
        inputs: { state: 0, forceLock: false, fireAlarm: false },
      },
    }

    uhppoted
      .getStatus(ctx, {
        id: 405419896,
        address: { address: '127.0.0.1', port: 59998 },
        protocol: 'tcp',
      })
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })

  it('should execute get-status using TCP with address:port string', function (done) {
    const expected = {
      deviceId: 405419896,
      state: {
        serialNumber: 405419896,
        event: {
          index: 69,
          type: {
            code: 2,
            event: 'door',
          },
          granted: true,
          door: 1,
          direction: {
            code: 1,
            direction: 'in',
          },
          card: 0,
          timestamp: '2019-08-10 10:28:32',
          reason: {
            code: 44,
            reason: 'remote open door',
          },
        },
        doors: { 1: false, 2: false, 3: false, 4: false },
        buttons: { 1: false, 2: false, 3: false, 4: false },
        system: { status: 0, date: '2021-05-28', time: '15:14:46' },
        specialInfo: 0,
        relays: {
          state: 0,
          relays: {
            1: false,
            2: false,
            3: false,
            4: false,
          },
        },
        inputs: { state: 0, forceLock: false, fireAlarm: false },
      },
    }

    uhppoted
      .getStatus(ctx, {
        id: 405419896,
        address: '127.0.0.1:59998',
        protocol: 'tcp',
      })
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

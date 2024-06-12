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
  0x17, 0xa8, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x20, 0x21, 0x01, 0x01, 0x20, 0x21, 0x12, 0x31,
  0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x08, 0x30, 0x03, 0x04, 0x11, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
])

const reply = Buffer.from([
  0x17, 0xa8, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
])

describe('#addTask(...)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply])
  })

  after(function () {
    teardown(sock)
  })

  it('should execute add-task', function (done) {
    const expected = {
      deviceId: 405419896,
      added: true
    }

    const task = {
      task: 'enable time profile',
      door: 3,
      valid: { from: '2021-01-01', to: '2021-12-31' },
      weekdays: ['Monday', 'Wednesday', 'Friday'],
      start: '08:30',
      cards: 17
    }

    uhppoted.addTask(ctx, 405419896, task)
      .then(response => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch(err => done(err))
  })
})

describe('#addTask(...) (TCP)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply], 'tcp')
  })

  after(function () {
    teardown(sock)
  })

  it('should execute add-task with address:port object', function (done) {
    const expected = {
      deviceId: 405419896,
      added: true
    }

    const task = {
      task: 'enable time profile',
      door: 3,
      valid: { from: '2021-01-01', to: '2021-12-31' },
      weekdays: ['Monday', 'Wednesday', 'Friday'],
      start: '08:30',
      cards: 17
    }

    uhppoted.addTask(ctx, { id: 405419896, address: { address: '127.0.0.1', port: 59998 }, protocol: 'tcp' }, task)
      .then(response => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch(err => done(err))
  })

  it('should execute add-task with address:port string', function (done) {
    const expected = {
      deviceId: 405419896,
      added: true
    }

    const task = {
      task: 'enable time profile',
      door: 3,
      valid: { from: '2021-01-01', to: '2021-12-31' },
      weekdays: ['Monday', 'Wednesday', 'Friday'],
      start: '08:30',
      cards: 17
    }

    uhppoted.addTask(ctx, { id: 405419896, address: '127.0.0.1:59998', protocol: 'tcp' }, task)
      .then(response => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch(err => done(err))
  })
})

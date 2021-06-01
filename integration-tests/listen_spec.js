const describe = require('mocha').describe
const before = require('mocha').before
const after = require('mocha').after
const it = require('mocha').it
const expect = require('chai').expect

const uhppoted = require('../index.js')
const ctx = require('./common.js').context
const stringToIP = require('./common.js').stringToIP
const dgram = require('dgram')

const events = [
  Buffer.from([
    0x17, 0x20, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x46, 0x00, 0x00, 0x00, 0x01, 0x00, 0x03, 0x01,
    0xa2, 0x98, 0x7c, 0x00, 0x20, 0x21, 0x05, 0x31, 0x16, 0x15, 0x09, 0x06, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x15, 0x09, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x21, 0x05, 0x31, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
]

const expected = [
  {
    deviceId: 405419896,
    state: {
      serialNumber: 405419896,
      event: {
        index: 70,
        timestamp: '2021-05-31 16:15:09',
        type: { code: 1, event: 'card swipe' },
        card: 8165538,
        direction: { code: 1, direction: 'in' },
        door: 3,
        granted: false,
        reason: { code: 6, reason: 'no access rights' }
      },
      doors: { 1: false, 2: false, 3: false, 4: false },
      buttons: { 1: false, 2: false, 3: false, 4: false },
      system: { date: '2021-05-31', status: 0, time: '16:15:09' },
      specialInfo: 0,
      relays: { relays: { 1: false, 2: false, 3: false, 4: false }, state: 0 },
      inputs: { fireAlarm: false, forceLock: false, state: 0 }
    }
  }
]

describe('#listen(...)', function () {
  let sock = null

  before(function () {
    sock = dgram.createSocket({ type: 'udp4', reuseAddr: true })

    sock.bind({ address: '0.0.0.0', port: 54321 })
  })

  after(function () {
    sock.close()
  })

  it('should receive event', function (done) {
    const sendto = stringToIP(ctx.config.listen)
    const received = []

    const onEvent = function (event) {
      received.push(event)
    }

    const onError = function (err) {
      console.log(`${err.message}`)
    }

    const listener = uhppoted.listen(ctx, onEvent, onError)

    events.forEach(e => {
      sock.send(new Uint8Array(e), 0, 64, sendto.port, sendto.address)
    })

    setTimeout(function () {
      listener.close()

      expect(received.length).to.equal(expected.length)
      for (let i = 0; i < expected.length; i++) {
        expect(received[i]).to.deep.equal(expected[i])
      }

      done()
    }, 100)
  })
})

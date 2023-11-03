const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const decoder = require('../src/decoder.js')

describe('decoder', function () {
  it('should decode get-status response', function () {
    const packet = Buffer.from([
      0x17, 0x20, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x4e, 0x00, 0x00, 0x00, 0x02, 0x01, 0x03, 0x01,
      0xa1, 0x98, 0x7c, 0x00, 0x20, 0x22, 0x08, 0x23, 0x09, 0x47, 0x06, 0x2c, 0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x01, 0x03, 0x09, 0x49, 0x39, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x27, 0x07, 0x09, 0x22, 0x08, 0x23, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ])

    const expected = {
      deviceId: 405419896,
      state: {
        serialNumber: 405419896,
        event: {
          index: 78,
          type: {
            code: 2,
            event: '{{door}}'
          },
          granted: true,
          door: 3,
          direction: {
            code: 1,
            direction: '{{in}}'
          },
          card: 8165537,
          timestamp: '2022-08-23 09:47:06',
          reason: {
            code: 44,
            reason: '{{remote open door}}'
          }
        },
        doors: {
          1: false,
          2: true,
          3: false,
          4: false
        },
        buttons: {
          1: false,
          2: false,
          3: false,
          4: true
        },
        system: {
          status: 3,
          date: '2022-08-23',
          time: '09:49:39'
        },
        specialInfo: 39,
        relays: {
          state: 7,
          relays: { 1: true, 2: false, 3: false, 4: false }
        },
        inputs: {
          state: 9,
          forceLock: true,
          fireAlarm: false
        }
      }
    }

    const bytes = new Uint8Array(packet)
    const msg = new DataView(bytes.buffer)
    const object = decoder.GetStatus(msg, null)

    expect(object).to.deep.equal(expected)
  })

  it('should decode get-status response without an event', function () {
    const packet = Buffer.from([
      0x17, 0x20, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x01, 0x03, 0x09, 0x49, 0x39, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x27, 0x07, 0x09, 0x22, 0x08, 0x23, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ])

    const expected = {
      deviceId: 405419896,
      state: {
        serialNumber: 405419896,
        event: {
          index: 0
        },
        doors: {
          1: false,
          2: true,
          3: false,
          4: false
        },
        buttons: {
          1: false,
          2: false,
          3: false,
          4: true
        },
        system: {
          status: 3,
          date: '2022-08-23',
          time: '09:49:39'
        },
        specialInfo: 39,
        relays: {
          state: 7,
          relays: { 1: true, 2: false, 3: false, 4: false }
        },
        inputs: {
          state: 9,
          forceLock: true,
          fireAlarm: false
        }
      }
    }

    const bytes = new Uint8Array(packet)
    const msg = new DataView(bytes.buffer)
    const object = decoder.GetStatus(msg, null)

    expect(object).to.deep.equal(expected)
  })
})

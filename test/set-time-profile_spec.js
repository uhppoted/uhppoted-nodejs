const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-time-profile', function () {
  describe('#set-time-profile with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      const profile = {
        id: 29,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        segments: [
          { start: '08:30', end: '11:45' },
          { start: '13:15', end: '17:25' }
        ],
        linkedTo: 3
      }

      return uhppoted.setTimeProfile({}, 0, profile)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      const profile = {
        id: 29,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        segments: [
          { start: '08:30', end: '11:45' },
          { start: '13:15', end: '17:25' }
        ],
        linkedTo: 3
      }

      return uhppoted.setTimeProfile({}, { id: 0, address: '192.168.1.125', protocol: 'tcp' }, profile)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid time profile ID', function () {
      const profile = {
        id: 0,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        segments: [
          { start: '08:30', end: '11:45' },
          { start: '13:15', end: '17:25' }
        ],
        linkedTo: 3
      }

      return uhppoted.setTimeProfile({}, 405419896, profile)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid time profile ID '0'")
        })
    })

    it('should fail with invalid time profile ID', function () {
      const profile = {
        id: 1,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        segments: [
          { start: '08:30', end: '11:45' },
          { start: '13:15', end: '17:25' }
        ],
        linkedTo: 3
      }

      return uhppoted.setTimeProfile({}, 405419896, profile)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid time profile ID '1'")
        })
    })

    it('should fail with invalid time profile ID', function () {
      const profile = {
        id: 255,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        segments: [
          { start: '08:30', end: '11:45' },
          { start: '13:15', end: '17:25' }
        ],
        linkedTo: 3
      }

      return uhppoted.setTimeProfile({}, 405419896, profile)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid time profile ID '255'")
        })
    })
  })
})

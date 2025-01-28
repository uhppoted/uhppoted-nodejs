const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('get-time-profile', function () {
  describe('#get-time-profile with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted
        .getTimeProfile({}, 0, 29)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      return uhppoted
        .getTimeProfile(
          {},
          { id: 0, address: '192.168.1.125', protocol: 'tcp' },
          29,
        )
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid time profile ID', function () {
      return uhppoted
        .getTimeProfile({}, 405419896, 0)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid time profile ID '0'")
        })
    })

    it('should fail with invalid time profile ID', function () {
      return uhppoted
        .getTimeProfile({}, 405419896, 1)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid time profile ID '1'")
        })
    })

    it('should fail with invalid time profile ID', function () {
      return uhppoted
        .getTimeProfile({}, 405419896, 255)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid time profile ID '255'")
        })
    })
  })
})

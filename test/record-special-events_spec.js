const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('record-special-events', function () {
  describe('#record-special-events with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted
        .recordSpecialEvents({}, 0, true)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      return uhppoted
        .recordSpecialEvents(
          {},
          { id: 0, address: '192.168.1.125', protocol: 'tcp' },
          true,
        )
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})

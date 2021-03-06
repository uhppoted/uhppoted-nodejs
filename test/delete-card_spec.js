const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('delete-card', function () {
  describe('#delete-card with invalid parameters', function () {
    it('should fail with invalid device ID', function () {
      return uhppoted.deleteCard({}, 0, 8165538)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid device ID '0'")
        })
    })

    it('should fail with invalid card number', function () {
      return uhppoted.deleteCard({}, 405419896, 0)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card number '0'")
        })
    })
  })
})

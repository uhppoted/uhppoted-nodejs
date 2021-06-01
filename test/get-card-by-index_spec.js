const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('get-card-by-index', function () {
  describe('#get-card-by-index with invalid parameters', function () {
    it('should fail with invalid device ID', function () {
      return uhppoted.getCardByIndex({}, 0, 3)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid device ID '0'")
        })
    })

    it('should fail with invalid card index', function () {
      return uhppoted.getCardByIndex({}, 405419896, 0)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card index '0'")
        })
    })
  })
})

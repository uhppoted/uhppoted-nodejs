const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('clear-time-profiles', function () {
  describe('#clear-time-profiles with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted.clearTimeProfiles({}, 0)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})

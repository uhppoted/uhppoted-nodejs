const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('activate-keypads', function () {
  describe('#activate-keypads with invalid parameters', function () {
    it('should fail with invalid device ID', function () {
      return uhppoted.activateKeypads({}, 0, 4)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid device ID '0'")
        })
    })
  })
})

const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('get-time', function () {
  describe('#get-time with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted.getTime({}, 0)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})

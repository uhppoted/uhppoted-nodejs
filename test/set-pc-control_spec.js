const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-pc-control', function () {
  describe('#set-pc-control with invalid parameters', function () {
    it('should fail with invalid device ID', function () {
      return uhppoted.setPCControl({}, 0, true)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid device ID '0'")
        })
    })
  })
})

const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-super-passwords', function () {
  describe('#set-super-passwords with invalid parameters', function () {
    it('should fail with invalid device ID', function () {
      return uhppoted.setSuperPasswords({}, 0, 3, [12345, 0, 999999, 54321])
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid device ID '0'")
        })
    })
  })
})

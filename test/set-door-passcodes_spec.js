const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-door-passcodes', function () {
  describe('#set-door-passcodes with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted.setDoorPasscodes({}, 0, 3, [12345, 0, 999999, 54321])
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})

const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-interlock', function () {
  describe('#set-interlock with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted.setInterlock({}, 0, 4)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})

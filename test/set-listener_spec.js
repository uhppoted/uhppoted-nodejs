const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-listener', function () {
  describe('#set-listener with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted.setListener({}, 0, '192.168.1.100', 60001)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})

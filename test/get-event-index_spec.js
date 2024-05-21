const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('get-event-index', function () {
  describe('#get-event-index with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted.getEventIndex({}, 0)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})

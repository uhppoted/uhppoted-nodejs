const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-event-index', function () {
  describe('#set-event-index with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted.setEventIndex({}, 0, 29)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      return uhppoted.setEventIndex({}, { id: 0, address: '192.168.1.125', protocol: 'tcp' }, 29)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid event index', function () {
      return uhppoted.setEventIndex({}, 405419896, 0)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid event index '0'")
        })
    })
  })
})

const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('get-door-control', function () {
  describe('#get-door-control with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted
        .getDoorControl({}, 0, 3)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      return uhppoted
        .getDoorControl({}, { id: 0, address: '192.168.1.125', protocol: 'tcp' }, 3)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid door', function () {
      return uhppoted
        .getDoorControl({}, 405419896, 0)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid door '0'")
        })
    })
  })
})

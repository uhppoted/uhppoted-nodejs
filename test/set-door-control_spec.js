const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-door-control', function () {
  describe('#set-door-control with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted.setDoorControl({}, 0, 3, 4, 'normally closed')
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      return uhppoted.setDoorControl({}, { id: 0, address: '192.168.1.125', protocol: 'tcp' }, 3, 4, 'normally closed')
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid door', function () {
      return uhppoted.setDoorControl({}, 405419896, 0, 4, 'normally closed')
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid door '0'")
        })
    })
  })
})

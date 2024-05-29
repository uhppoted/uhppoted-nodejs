const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('get-cards', function () {
  describe('#get-cards with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted.getCards({}, 0, 8165538)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      return uhppoted.getCards({}, { controller: 0, address: '192.168.1.125', protocol: 'tcp' }, 8165538)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})

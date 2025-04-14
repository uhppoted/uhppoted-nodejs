const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-time', function () {
  describe('#set-time with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted
        .setTime({}, 0, '2021-06-01 16:52:35')
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      return uhppoted
        .setTime({}, { id: 0, address: '192.168.1.125', protocol: 'tcp' }, '2021-06-01 16:52:35')
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})

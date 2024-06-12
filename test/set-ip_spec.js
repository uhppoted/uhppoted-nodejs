const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-ip', function () {
  describe('#set-ip with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      return uhppoted.setIP({}, 0, '192.168.1.100', '255.255.255.0', '192.168.1.1')
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      return uhppoted.setIP({}, { id: 0, address: '192.168.1.125', protocol: 'tcp' }, '192.168.1.100', '255.255.255.0', '192.168.1.1')
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})

const describe = require('mocha').describe
const it = require('mocha').it
const ip = require('ip')

describe('github', function () {
  describe('#detecting local IP configuration', function () {
    it('should detect IP address', function () {
      const addr = ip.address()
      const subnet = ip.subnet(addr, '255.255.255.0')

      console.log(addr)
      console.log(subnet)
    })
  })
})

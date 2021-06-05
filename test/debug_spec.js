const describe = require('mocha').describe
const it = require('mocha').it
const ip = require('ip')
const os = require('os')

describe('github', function () {
  describe('#detecting local IP configuration', function () {
    it('should detect IP address', function () {
      const addr = ip.address()
      const subnet = ip.subnet(addr, '255.255.255.0')
      const interfaces = os.networkInterfaces()

      console.log(addr)
      console.log(subnet)
      console.log(interfaces)

      // for (const name of Object.keys(interfaces)) {
      //   for (const net of interfaces[name]) {
      //     console.log(net)
      //   }
      // }
    })
  })
})

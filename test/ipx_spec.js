const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const ipx = require('../src/ipx.js')

describe('ipx::fromLong', function () {
  it('converts a uint32 value to an IPv4 address string', function () {
    const packet = Buffer.from([
      0x17, 0x94, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0xc0, 0xa8, 0x01, 0x64, 0xff, 0xff, 0xff, 0x00,
      0xc0, 0xa8, 0x01, 0x01, 0x00, 0x12, 0x23, 0x34, 0x45, 0x56, 0x08, 0x92, 0x20, 0x18, 0x11, 0x05,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ])

    const expected = '192.168.1.100'

    const bytes = new Uint8Array(packet)
    const buffer = new DataView(bytes.buffer)
    const address = ipx.fromLong(buffer.getUint32(8, false))

    expect(address).to.deep.equal(expected)
  })
})

describe('ipx::toBuffer', function () {
  it('packs and IPv4 address into a buffer', function () {
    const expected = Buffer.from([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0xa8, 0x01, 0x64, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ])

    const buffer = Buffer.alloc(64)
    const address = '192.168.1.100'

    ipx.toBuffer(address, buffer, 8)

    const bytes = new Uint8Array(buffer)

    expect(bytes).to.deep.equal(expected)
  })
})

describe('ipx::broadcastAddr', function () {
  it('convolves an IPv4 address and an IPv4 subnet mask to calculate the broadcast address', function () {
    const tests = [
      { address: '127.0.0.1', netmask: '255.0.0.0', broadcast: '127.255.255.255' },
      { address: '192.168.1.100', netmask: '255.255.255.0', broadcast: '192.168.1.255' }
    ]

    for (const test of tests) {
      const broadcast = ipx.broadcastAddr(test.address, test.netmask)

      expect(broadcast).to.deep.equal(test.broadcast)
    }
  })
})

// >>>>>>>>>>>>>>>>>  127.0.0.1 255.0.0.0 {
//   networkAddress: '127.0.0.0',
//   firstAddress: '127.0.0.1',
//   lastAddress: '127.255.255.254',
//   broadcastAddress: '127.255.255.255',
//   subnetMask: '255.0.0.0',
//   subnetMaskLength: 8,
//   numHosts: 16777214,
//   length: 16777216,
//   contains: [Function: contains]
// }
// >>>>>>>>>>>>>>>>>  192.168.1.100 255.255.255.0 {
//   networkAddress: '192.168.1.0',
//   firstAddress: '192.168.1.1',
//   lastAddress: '192.168.1.254',
//   broadcastAddress: '192.168.1.255',
//   subnetMask: '255.255.255.0',
//   subnetMaskLength: 24,
//   numHosts: 254,
//   length: 256,
//   contains: [Function: contains]
// }

const { Buffer } = require('node:buffer')

const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const ipx = require('../src/ipx.js')

describe('ipx::fromLong', function () {
  it('converts a uint32 value to an IPv4 address string', function () {
    const expected = '192.168.1.100'
    const address = ipx.fromLong(3232235876)

    expect(address).to.deep.equal(expected)
  })
})

describe('ipx::fromLong', function () {
  it('converts an IPv4 address string to a uint32', function () {
    const expected = 3232235876
    const address = ipx.toLong('192.168.1.100')

    expect(address).to.deep.equal(expected)
  })
})

describe('ipx::toBuffer', function () {
  it('packs and IPv4 address into a buffer', function () {
    const expected = Buffer.from([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0xa8, 0x01, 0x64,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
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
      {
        address: '127.0.0.1',
        netmask: '255.0.0.0',
        broadcast: '127.255.255.255',
      },
      {
        address: '192.168.1.100',
        netmask: '255.255.255.0',
        broadcast: '192.168.1.255',
      },
    ]

    for (const test of tests) {
      const broadcast = ipx.broadcastAddr(test.address, test.netmask)

      expect(broadcast).to.deep.equal(test.broadcast)
    }
  })
})

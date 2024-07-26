/**
 * In-house replacement module for ip.js to reduce exposure to security issues.
 *
 * @module ipx
 * @private
 */

const ip = require('ip')

module.exports = {
  /**
    * Converts a uint32 IPv4 address to a string.
    *
    * @param {uint32}   v  IPv4 address
    *
    * @param {string}   IPv4 address as a dotted string.
    */
  fromLong: function (v) {
    const b0 = (v >>> 24) & 0x00ff
    const b1 = (v >>> 16) & 0x00ff
    const b2 = (v >>> 8) & 0x00ff
    const b3 = (v >>> 0) & 0x00ff

    return `${b0}.${b1}.${b2}.${b3}`
  },

  /**
    * Convolves an IPv4 address and a netmask to get the broadcast address.
    *
    * @param {uint32}   addr    IPv4 address
    * @param {uint32}   netmask IPv4 subnetmask
    *
    * @param {uint32} netmasked IPv4 address
    */
  broadcastAddr: function (addr, mask) {
    return ip.subnet(addr, mask).broadcastAddress
  },

  /**
    * Packs an IPv4 address into a byte buffer
    *
    * @param {string}   addr    IPv4 address as a dotted string
    * @param {Buffer}   buffer  byte buffer
    * @param {int}      offset  start offset into byte buffer
    *
    */
  toBuffer: function (addr, buffer, offset) {
    return ip.toBuffer(addr, buffer, offset)
  }
}

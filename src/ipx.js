/**
 * In-house replacement module for ip.js to reduce exposure to security issues.
 *
 * @module ipx
 * @private
 */

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
    * Converts an IPv4 address string to a uint32 value
    *
    * @param {string} address  IPv4 address as a dotted string.
    *
    * @param {uint32} IPv4 address as a uint32
    */
  toLong: function (address) {
    let v = 0

    address.split('.').forEach((octet) => {
      v <<= 8
      v += parseInt(octet)
    })

    return v >>> 0 // convert to unsigned
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
    addr.split(/\./g).forEach((octet) => {
      buffer[offset++] = parseInt(octet, 10) & 0xff
    })
  },

  /**
    * Convolves an IPv4 address and a netmask to get the broadcast address.
    *
    * @param {uint32}   address IPv4 address
    * @param {uint32}   netmask valid IPv4 subnet mask
    *
    * @param {uint32} netmasked IPv4 address
    */
  broadcastAddr: function (address, mask) {
    const addr = this.toLong(address)
    const subnet = this.toLong(mask)

    // ... calculate mask bit-length
    //     Ref. https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel
    //     Ref. https://stackoverflow.com/questions/109023/count-the-number-of-set-bits-in-a-32-bit-integer
    let v = subnet

    v = v - ((v >>> 1) & 0x55555555)
    v = (v & 0x33333333) + ((v >>> 2) & 0x33333333)
    v = (v + (v >>> 4)) & 0x0f0f0f0f

    const bits = (v * 0x01010101) >>> 24
    const naddr = 2 ** (32 - bits)
    const broadcast = this.fromLong((addr & subnet) + naddr - 1)

    return broadcast
  }
}

// ip.mask = function (addr, mask) {
//   addr = ip.toBuffer(addr);
//   mask = ip.toBuffer(mask);
//
//   const result = Buffer.alloc(Math.max(addr.length, mask.length));
//
//   // Same protocol - do bitwise and
//   let i;
//   if (addr.length === mask.length) {
//     for (i = 0; i < addr.length; i++) {
//       result[i] = addr[i] & mask[i];
//     }
//   } else if (mask.length === 4) {
//     // IPv6 address and IPv4 mask
//     // (Mask low bits)
//     for (i = 0; i < mask.length; i++) {
//       result[i] = addr[addr.length - 4 + i] & mask[i];
//     }
//   } else {
//     // IPv6 mask and IPv4 addr
//     for (i = 0; i < result.length - 6; i++) {
//       result[i] = 0;
//     }
//
//     // ::ffff:ipv4
//     result[10] = 0xff;
//     result[11] = 0xff;
//     for (i = 0; i < addr.length; i++) {
//       result[i + 12] = addr[i] & mask[i + 12];
//     }
//     i += 12;
//   }
//   for (; i < result.length; i++) {
//     result[i] = 0;
//   }
//
//   return ip.toString(result);
// };

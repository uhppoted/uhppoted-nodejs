module.exports = {
  /**
    * Decodes the response to a get-status request (function code 0x20).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded get-status response object
    */
  GetStatus: function (bytes, translator) {
    const lookup = require('./lookup.js')

    return {
      deviceId: uint32(bytes, 4),
      state: {
        serialNumber: uint32(bytes, 4),
        event: {
          index: uint32(bytes, 8),
          type: lookup.eventType(bytes, 12, translator),
          granted: bool(bytes, 13),
          door: uint8(bytes, 14),
          direction: lookup.direction(bytes, 15, translator),
          card: uint32(bytes, 16),
          timestamp: yyyymmddHHmmss(bytes, 20),
          reason: lookup.reason(bytes, 27, translator)
        },
        doors: {
          1: bool(bytes, 28),
          2: bool(bytes, 29),
          3: bool(bytes, 30),
          4: bool(bytes, 31)
        },
        buttons: {
          1: bool(bytes, 32),
          2: bool(bytes, 33),
          3: bool(bytes, 34),
          4: bool(bytes, 35)
        },
        system: {
          status: uint8(bytes, 36),
          date: yymmdd(bytes, 51),
          time: HHmmss(bytes, 37)
        },
        specialInfo: uint8(bytes, 48),
        relays: lookup.relays(bytes, 49),
        inputs: lookup.inputs(bytes, 50)
      }
    }
  },

  /**
    * Decodes the response to a set-time request (function code 0x30).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded set-time response object
    */
  SetTime: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      datetime: yyyymmddHHmmss(bytes, 8)
    }
  },

  /**
    * Decodes the response to a get-time request (function code 0x32).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded get-time response object
    */
  GetTime: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      datetime: yyyymmddHHmmss(bytes, 8)
    }
  },

  /**
    * Decodes the response to an open-door request (function code 0x40).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded open-door response object
    */
  OpenDoor: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      opened: bool(bytes, 8)
    }
  },

  /**
    * Decodes the response to a put-card request (function code 0x50).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded put-card response object
    */
  PutCard: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      stored: bool(bytes, 8)
    }
  },

  /**
    * Decodes the response to a delete-card request (function code 0x52).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded delete-card response object
    */
  DeleteCard: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      deleted: bool(bytes, 8)
    }
  },

  /**
    * Decodes the response to a delete-cards request (function code 0x54).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded delete-cards response object
    */
  DeleteCards: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      deleted: bool(bytes, 8)
    }
  },

  /**
    * Decodes the response to a get-cards request (function code 0x58).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded get-cards response object
    */
  GetCards: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      cards: uint32(bytes, 8)
    }
  },

  /**
    * Decodes the response to a get-card-by-id request (function code 0x5a).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded get-card-by-id response object
    */
  GetCardByID: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      card: {
        number: uint32(bytes, 8),
        valid: {
          from: yyyymmdd(bytes, 12),
          to: yyyymmdd(bytes, 16)
        },
        doors: {
          1: bool(bytes, 20),
          2: bool(bytes, 21),
          3: bool(bytes, 22),
          4: bool(bytes, 23)
        }
      }
    }
  },

  /**
    * Decodes the response to a get-card-by-index request (function code 0x5c).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded get-card-by-index response object
    */
  GetCardByIndex: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      card: {
        number: uint32(bytes, 8),
        valid: {
          from: yyyymmdd(bytes, 12),
          to: yyyymmdd(bytes, 16)
        },
        doors: {
          1: bool(bytes, 20),
          2: bool(bytes, 21),
          3: bool(bytes, 22),
          4: bool(bytes, 23)
        }
      }
    }
  },

  /**
    * Decodes the response to a set-door-control request (function code 0x80).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded set-door-control response object
    */
  SetDoorControl: function (bytes, translator) {
    const lookup = require('./lookup.js')

    return {
      deviceId: uint32(bytes, 4),
      doorControlState: {
        door: uint8(bytes, 8),
        delay: uint8(bytes, 10),
        control: lookup.doorState(bytes, 9, translator)
      }
    }
  },

  /**
    * Decodes the response to a get-door-control request (function code 0x82).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded get-door-control response object
    */
  GetDoorControl: function (bytes, translator) {
    const lookup = require('./lookup.js')

    return {
      deviceId: uint32(bytes, 4),
      doorControlState: {
        door: uint8(bytes, 8),
        delay: uint8(bytes, 10),
        control: lookup.doorState(bytes, 9, translator)
      }
    }
  },

  /**
    * Decodes the response to a set-listener request (function code 0x90).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded set-listener response object
    */
  SetListener: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      updated: bool(bytes, 8)
    }
  },

  /**
    * Decodes the response to a get-listener request (function code 0x92).
    *
    * @param {buffer}   bytes      64 byte array
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded get-listener response object
    */
  GetListener: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      address: address(bytes, 8),
      port: uint16(bytes, 12)
    }
  },

  /**
    * Decodes the response to a get-device request (function code 0x94).
    *
    * @param {buffer}   buffer     64 byte NodeJS buffer
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded device object
    */
  GetDevice: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      device: {
        serialNumber: uint32(bytes, 4),
        address: address(bytes, 8),
        netmask: address(bytes, 12),
        gateway: address(bytes, 16),
        MAC: mac(bytes, 20),
        version: bcd(bytes, 26, 2),
        date: yyyymmdd(bytes, 28)
      }

    }
  },

  /**
    * Decodes the response to a record-special-events request (function code 0x8e).
    *
    * @param {buffer}   buffer     64 byte NodeJS buffer
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded record-special-events response object
    */
  RecordSpecialEvents: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      updated: bool(bytes, 8)
    }
  },

  /**
    * Decodes the response to a get-event request (function code 0xb0).
    *
    * @param {buffer}   buffer     64 byte NodeJS buffer
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded event object
    */
  GetEvent: function (bytes, translator) {
    const lookup = require('./lookup.js')

    return {
      deviceId: uint32(bytes, 4),
      event: {
        index: uint32(bytes, 8),
        type: lookup.eventType(bytes, 12, translator),
        granted: bool(bytes, 13),
        door: uint8(bytes, 14),
        direction: lookup.direction(bytes, 15, translator),
        card: uint32(bytes, 16),
        timestamp: yyyymmddHHmmss(bytes, 20),
        reason: lookup.reason(bytes, 27, translator)
      }
    }
  },

  /**
    * Decodes the response to a set-event-index request (function code 0xb2).
    *
    * @param {buffer}   buffer     64 byte NodeJS buffer
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded set-event-index response object
    */
  SetEventIndex: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      updated: bool(bytes, 8)
    }
  },

  /**
    * Decodes the response to a get-event-index request (function code 0xb4).
    *
    * @param {buffer}   buffer     64 byte NodeJS buffer
    * @param {function} translator (optional) function to internationalise the text in a
    *                              decoded object
    *
    * @param {object}   Decoded get-event-index response object
    */
  GetEventIndex: function (bytes, translator) {
    return {
      deviceId: uint32(bytes, 4),
      index: uint32(bytes, 8)
    }
  }
}

/**
  * Internal utility function to extract a bool from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of bool in buffer
  *
  * @param {bool}   true if the byte at the offset is 1, false otherwise.
  */
function bool (bytes, offset) {
  return bytes.getUint8(offset, true) === 0x01
}

/**
  * Internal utility function to extract a uint8 from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of uint8 in buffer
  *
  * @param {uint8}  uint8 at offset in buffer.
  */
function uint8 (bytes, offset) {
  return bytes.getUint8(offset, true)
}

/**
  * Internal utility function to extract a uint16 from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of uint16 in buffer
  *
  * @param {uint16}  Litte-endian uint16 at offset in buffer.
  */
function uint16 (bytes, offset) {
  return bytes.getUint16(offset, true)
}

/**
  * Internal utility function to extract a uint32 from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of uint32 in buffer
  *
  * @param {uint32}  Litte-endian uint32 at offset in buffer.
  */
function uint32 (bytes, offset) {
  return bytes.getUint32(offset, true)
}

/**
  * Internal utility function to extract a BCD number from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of BCD number in buffer
  * @param {number} length  Number of bytes to decode
  *
  * @param {string}  Decoded number as a string.
  */
function bcd (bytes, offset, length) {
  const slice = new Uint8Array(bytes.buffer.slice(offset, offset + length))
  const digits = []

  for (let i = 0; i < slice.length; i++) {
    digits.push((slice[i] >>> 4).toString(10))
    digits.push((slice[i] & 0x0f).toString(10))
  }

  return digits.join('')
}

/**
  * Internal utility function to extract a BCD timestamp from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of timestamp in buffer
  *
  * @param {string}  Decoded 6 byte timestamp in yyy-mm-dd HH:mm:ss format.
  */
function yyyymmddHHmmss (bytes, offset) {
  const datetime = bcd(bytes, offset, 7)
  const date = datetime.substr(0, 4) + '-' + datetime.substr(4, 2) + '-' + datetime.substr(6, 2)
  const time = datetime.substr(8, 2) + ':' + datetime.substr(10, 2) + ':' + datetime.substr(12, 2)

  return date + ' ' + time
}

/**
  * Internal utility function to extract a BCD date from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of date in buffer
  *
  * @param {string}  Decoded 4 byte date in yyyy-mm-dd format.
  */
function yyyymmdd (bytes, offset) {
  const date = bcd(bytes, offset, 4)

  if (date === '00000000') {
    return ''
  }

  return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
}

/**
  * Internal utility function to extract an abbreviated BCD date from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of date in buffer
  *
  * @param {string}  Decoded 3 byte date in yyyy-mm-dd format (assumes base centry is 2000).
  */
function yymmdd (bytes, offset) {
  const date = '20' + bcd(bytes, offset, 3)

  return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
}

/**
  * Internal utility function to extract a BCD time from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of time in buffer
  *
  * @param {string}  Decoded 3 byte time in HH:mm:ss format.
  */
function HHmmss (bytes, offset) {
  const time = bcd(bytes, offset, 3)

  return time.substr(0, 2) + ':' + time.substr(2, 2) + ':' + time.substr(4, 2)
}

/**
  * Internal utility function to extract an IP address from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of IP address in buffer
  *
  * @param {string}  Decoded 4 byte IPv4 address as a IP address object.
  */
function address (bytes, offset) {
  const ip = require('ip')

  return ip.fromLong(bytes.getUint32(offset, false))
}

/**
  * Internal utility function to extract a MAC address from a response message.
  *
  * @param {array}  buffer  64 byte DataView
  * @param {number} offset  Index of MAC address in buffer
  *
  * @param {string}  Decoded 6 byte MAC address as a colon delimited string.
  */
function mac (bytes, offset) {
  const slice = new Uint8Array(bytes.buffer.slice(offset, offset + 6))
  const hex = []

  for (let i = 0; i < slice.length; i++) {
    hex.push(('0' + slice[i].toString(16)).slice(-2))
  }

  return hex.join(':')
}

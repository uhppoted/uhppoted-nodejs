module.exports = {
  /**
    * Encodes a get-device request.
    *
    * @param {number} deviceId  Controller serial number (0 implies a get-all-devices)
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded get-device request
    */
  GetDevice: function (deviceId) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x94, 1)
    if (deviceId !== null) {
      request.writeUInt32LE(deviceId, 4)
    }

    return request
  },

  /**
    * Encodes a set-address request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {string} address   IPv4 address assigned to controller
    * @param {string} netmask   IPv4 subnet mask assigned to controller
    * @param {string} gateway   IPv4 gateway address
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded set-address request
    */
  SetIP: function (deviceId, { address, netmask, gateway } = {}) {
    const ip = require('ip')
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x96, 1)
    request.writeUInt32LE(deviceId, 4)
    ip.toBuffer(address, request, 8)
    ip.toBuffer(netmask, request, 12)
    ip.toBuffer(gateway, request, 16)
    request.writeUInt32LE(0x55aaaa55, 20)

    return request
  },

  /**
    * Encodes a set-listener request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {string} address   IPv4 listener address for controller events
    * @param {number} port      IPv4 listener port for controller events
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded set-address request
    */
  SetListener: function (deviceId, { address, port } = {}) {
    const ip = require('ip')
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x90, 1)
    request.writeUInt32LE(deviceId, 4)
    ip.toBuffer(address, request, 8)
    request.writeUInt16LE(port, 12)

    return request
  },

  /**
    * Encodes a get-listener request.
    *
    * @param {number} deviceId  Controller serial number
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded get-listener request
    */
  GetListener: function (deviceId) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x92, 1)
    request.writeUInt32LE(deviceId, 4)

    return request
  },

  /**
    * Encodes a set-time request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {date}   datetime  Date and time to which to set controller time
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded set-time request
    */
  SetTime: function (deviceId, { datetime } = {}) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x30, 1)
    request.writeUInt32LE(deviceId, 4)
    datetime2bin(datetime).copy(request, 8)

    return request
  },

  /**
    * Encodes a get-time request.
    *
    * @param {number} deviceId  Controller serial number
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded get-time request.
    */
  GetTime: function (deviceId) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x32, 1)
    request.writeUInt32LE(deviceId, 4)

    return request
  },

  /**
    * Encodes a set-door-control request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {number} door      Door number in the range [1..4]
    * @param {number} delay     Door open delay (in seconds)
    * @param {string} control   Door control state ('normally open', 'normally closed' or 'controlled')
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded set-door-control request
    */
  SetDoorControl: function (deviceId, { door, delay, control } = {}) {
    const opcodes = require('../nodes/opcodes.js')

    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x80, 1)
    request.writeUInt32LE(deviceId, 4)
    request.writeUInt8(door, 8)
    request.writeUInt8(delay, 10)
    switch (control) {
      case opcodes.NormallyOpen:
        request.writeUInt8(1, 9)
        break

      case opcodes.NormallyClosed:
        request.writeUInt8(2, 9)
        break

      case opcodes.Controlled:
        request.writeUInt8(3, 9)
        break

      default:
        throw new Error(`invalid door control ${control}`)
    }

    return request
  },

  /**
    * Encodes a get-door-control request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {number} door      Door number in the range [1..4]
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded get-door-control request.
    */
  GetDoorControl: function (deviceId, { door } = {}) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x82, 1)
    request.writeUInt32LE(deviceId, 4)
    request.writeUInt8(door, 8)

    return request
  },

  /**
    * Encodes a get-status request.
    *
    * @param {number} deviceId  Controller serial number
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded get-status request.
    */
  GetStatus: function (deviceId) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x20, 1)
    request.writeUInt32LE(deviceId, 4)

    return request
  },

  /**
    * Encodes an open-door request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {number} door      Door number in the range [1..4]
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded open-door request.
    */
  OpenDoor: function (deviceId, { door } = {}) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x40, 1)
    request.writeUInt32LE(deviceId, 4)
    request.writeUInt8(door, 8)

    return request
  },

  /**
    * Encodes a get-cards request.
    *
    * @param {number} deviceId  Controller serial number
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded get-cards request.
    */
  GetCards: function (deviceId, object) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x58, 1)
    request.writeUInt32LE(deviceId, 4)

    return request
  },

  /**
    * Encode a get-card-by-id request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {number} card      Card number
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded get-card-by-id request.
    */
  GetCardByID: function (deviceId, { card } = {}) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x5a, 1)
    request.writeUInt32LE(deviceId, 4)
    request.writeUInt32LE(card, 8)

    return request
  },

  /**
    * Encode a get-card-by-index request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {number} index     Card index
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded get-card-by-index request.
    */
  GetCardByIndex: function (deviceId, { index } = {}) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x5c, 1)
    request.writeUInt32LE(deviceId, 4)
    request.writeUInt32LE(index, 8)

    return request
  },

  /**
    * Encode a put-card request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {number} card      Card number
    * @param {date}   from      Card validity start date
    * @param {date}   to        Card validity end date
    * @param {object} doors     Object mapping door numbers 1..4 to true/false access rights
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded put-card request.
    */
  PutCard: function (deviceId, { card, from, to, doors } = {}) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x50, 1)
    request.writeUInt32LE(deviceId, 4)
    request.writeUInt32LE(card, 8)
    date2bin(from).copy(request, 12)
    date2bin(to).copy(request, 16)
    request.writeUInt8(doors['1'] ? 0x01 : 0x00, 20)
    request.writeUInt8(doors['2'] ? 0x01 : 0x00, 21)
    request.writeUInt8(doors['3'] ? 0x01 : 0x00, 22)
    request.writeUInt8(doors['4'] ? 0x01 : 0x00, 23)

    return request
  },

  /**
    * Encode a delete-card request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {number} card      Card number to delete
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded delete-card request.
    */
  DeleteCard: function (deviceId, { card } = {}) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x52, 1)
    request.writeUInt32LE(deviceId, 4)
    request.writeUInt32LE(card, 8)

    return request
  },

  /**
    * Encode a delete-all-cards request.
    *
    * @param {number} deviceId  Controller serial number
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded delete-all-cards request.
    */
  DeleteCards: function (deviceId) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x54, 1)
    request.writeUInt32LE(deviceId, 4)
    request.writeUInt32LE(0x55aaaa55, 8)

    return request
  },

  /**
    * Encode a record-special-events request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {number} enable    true/false
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded record-special-events request.
    */
  RecordSpecialEvents: function (deviceId, { enable } = {}) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0x8e, 1)
    request.writeUInt32LE(deviceId, 4)

    if (enable) {
      request.writeUInt8(1, 8)
    } else {
      request.writeUInt8(0, 8)
    }

    return request
  },

  /**
    * Encode a get-event-index request.
    *
    * @param {number} deviceId  Controller serial number
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded get-event-index request.
    */
  GetEventIndex: function (deviceId) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0xb4, 1)
    request.writeUInt32LE(deviceId, 4)

    return request
  },

  /**
    * Encode a set-event-index request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {number} index     Index to which to set controller internal event index
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded set-event-index request.
    */
  SetEventIndex: function (deviceId, { index } = {}) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0xb2, 1)
    request.writeUInt32LE(deviceId, 4)
    request.writeUInt32LE(index, 8)
    request.writeUInt32LE(0x55aaaa55, 12)

    return request
  },

  /**
    * Encode a get-event request.
    *
    * @param {number} deviceId  Controller serial number
    * @param {number} index     Index of event to retrieve
    *
    * @return {buffer} 64 byte NodeJS buffer with encoded get-event request.
    */
  GetEvent: function (deviceId, { index } = {}) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)
    request.writeUInt8(0xb0, 1)
    request.writeUInt32LE(deviceId, 4)
    request.writeUInt32LE(index, 8)

    return request
  }
}

/**
  * Internal utility function to encode a timestamp as BCD.
  *
  * @param {string} datetime Timestamp, formatted as yyyy-mm-dd HH:mm:ss
  * @param {number} offset   Index of time in buffer
  *
  * @param {buffer} 6 byte NodeJS buffer with BCD encoded timestamp.
  */
function datetime2bin (datetime) {
  const bytes = []
  const re = /([0-9]{2})([0-9]{2})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/
  const match = datetime.match(re)

  for (const m of match.slice(1)) {
    const b = parseInt(m, 10)
    const byte = ((b / 10) << 4) | (b % 10)
    bytes.push(byte)
  }

  return Buffer.from(bytes)
}

/**
  * Internal utility function to encode a date as BCD.
  *
  * @param {string} date    Date, formatted as yyyy-mm-dd
  * @param {number} offset  Index of time in buffer
  *
  * @param {buffer} 4 byte NodeJS buffer with BCD encoded timestamp
  *
  */
function date2bin (date) {
  const bytes = []
  const re = /([0-9]{2})([0-9]{2})-([0-9]{2})-([0-9]{2})/
  const match = date.match(re)

  for (const m of match.slice(1)) {
    const b = parseInt(m, 10)
    const byte = ((b / 10) << 4) | (b % 10)
    bytes.push(byte)
  }

  return Buffer.from(bytes)
}

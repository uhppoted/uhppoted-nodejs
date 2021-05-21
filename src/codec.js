const opcodes = require('./opcodes.js')
const encoder = require('./encoder.js')
const decoder = require('./decoder.js')

/**
  * Lookup table that maps op codes to the equivalent encoder function.
  */
const enc = new Map([
  [opcodes.GetDevice, encoder.GetDevice],
  [opcodes.SetIP, encoder.SetIP],
  [opcodes.GetListener, encoder.GetListener],
  [opcodes.SetListener, encoder.SetListener],
  [opcodes.GetTime, encoder.GetTime],
  [opcodes.SetTime, encoder.SetTime],
  [opcodes.GetDoorControl, encoder.GetDoorControl],
  [opcodes.SetDoorControl, encoder.SetDoorControl],
  [opcodes.GetStatus, encoder.GetStatus],
  [opcodes.OpenDoor, encoder.OpenDoor],
  [opcodes.GetCards, encoder.GetCards],
  [opcodes.GetCardByID, encoder.GetCardByID],
  [opcodes.GetCardByIndex, encoder.GetCardByIndex],
  [opcodes.PutCard, encoder.PutCard],
  [opcodes.DeleteCard, encoder.DeleteCard],
  [opcodes.DeleteCards, encoder.DeleteCards],
  [opcodes.RecordSpecialEvents, encoder.RecordSpecialEvents],
  [opcodes.GetEventIndex, encoder.GetEventIndex],
  [opcodes.SetEventIndex, encoder.SetEventIndex],
  [opcodes.GetEvent, encoder.GetEvent]
])

/**
  * Lookup table that maps message codes to the equivalent decoder function.
  */
const dec = new Map([
  [0x20, decoder.GetStatus],
  [0x30, decoder.SetTime],
  [0x32, decoder.GetTime],
  [0x40, decoder.OpenDoor],
  [0x50, decoder.PutCard],
  [0x52, decoder.DeleteCard],
  [0x54, decoder.DeleteCards],
  [0x58, decoder.GetCards],
  [0x5a, decoder.GetCardByID],
  [0x5c, decoder.GetCardByIndex],
  [0x80, decoder.SetDoorControl],
  [0x82, decoder.GetDoorControl],
  [0x90, decoder.SetListener],
  [0x92, decoder.GetListener],
  [0x94, decoder.GetDevice],
  [0x8e, decoder.RecordSpecialEvents],
  [0xb0, decoder.GetEvent],
  [0xb2, decoder.SetEventIndex],
  [0xb4, decoder.GetEventIndex]
])

module.exports = {
  /**
    * Encodes a request as a 64 byte UDP message.
    *
    * @param {opcode}   code     Function opcode, translated into message function byte
    * @param {number}   deviceId The serial number for the target access controller
    * @param {object}   object   Additional request specific information.
    *
    * @param {buffer}   64 byte NodeJS Buffer
    *
    * @exports
    */
  encode: function (code, deviceId, object) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)

    if (enc.has(code)) {
      const f = enc.get(code)

      return f(deviceId, object)
    }

    throw new Error(`invalid protocol function code ${code}`)
  },

  /**
    * Decodes a 64 byte received message into the corresponding object.
    *
    * @param {buffer}   buffer     64 byte NodeJS buffer
    *
    * @param {object}   Decoded object (or null)
    *
    * @exports
    */
  decode: function (buffer) {
    // NOTE: v6.62 firmware sends events with SOM code 0x19
    //       Ref. https://github.com/uhppoted/node-red-contrib-uhppoted/issues/3
    if (buffer.length === 64 && (buffer[0] === 0x17 || (buffer[0] === 0x19 && buffer[1] === 0x20)) && dec.has(buffer[1])) {
      const f = dec.get(buffer[1])
      const bytes = new DataView(buffer.buffer)

      return f(bytes)
    }

    return null
  }
}

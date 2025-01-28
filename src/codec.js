/**
 * Encodes and decodes binary UHPPOTE controller messages.
 *
 * @module codec
 * @private
 */

const opcodes = require('./opcodes.js')
const errors = require('./errors.js')
const encoder = require('./encoder.js')
const decoder = require('./decoder.js')
const { Buffer } = require('node:buffer')

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
  [opcodes.SetDoorPasscodes, encoder.SetDoorPasscodes],

  [opcodes.GetStatus, encoder.GetStatus],

  [opcodes.GetCards, encoder.GetCards],
  [opcodes.GetCardByID, encoder.GetCardByID],
  [opcodes.GetCardByIndex, encoder.GetCardByIndex],
  [opcodes.PutCard, encoder.PutCard],
  [opcodes.DeleteCard, encoder.DeleteCard],
  [opcodes.DeleteCards, encoder.DeleteCards],

  [opcodes.GetTimeProfile, encoder.GetTimeProfile],
  [opcodes.SetTimeProfile, encoder.SetTimeProfile],
  [opcodes.ClearTimeProfiles, encoder.ClearTimeProfiles],

  [opcodes.ClearTaskList, encoder.ClearTaskList],
  [opcodes.AddTask, encoder.AddTask],
  [opcodes.RefreshTaskList, encoder.RefreshTaskList],

  [opcodes.GetEventIndex, encoder.GetEventIndex],
  [opcodes.SetEventIndex, encoder.SetEventIndex],
  [opcodes.GetEvent, encoder.GetEvent],
  [opcodes.RecordSpecialEvents, encoder.RecordSpecialEvents],

  [opcodes.OpenDoor, encoder.OpenDoor],
  [opcodes.SetPCControl, encoder.SetPCControl],
  [opcodes.SetInterlock, encoder.SetInterlock],
  [opcodes.ActivateKeypads, encoder.ActivateKeypads],

  [opcodes.RestoreDefaultParameters, encoder.RestoreDefaultParameters]
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
  [0x88, decoder.SetTimeProfile],
  [0x8a, decoder.ClearTimeProfiles],
  [0x8c, decoder.SetDoorPasscodes],
  [0x8e, decoder.RecordSpecialEvents],
  [0x90, decoder.SetListener],
  [0x92, decoder.GetListener],
  [0x94, decoder.GetDevice],
  [0x98, decoder.GetTimeProfile],
  [0xa0, decoder.SetPCControl],
  [0xa2, decoder.SetInterlock],
  [0xa4, decoder.ActivateKeypads],
  [0xa6, decoder.ClearTaskList],
  [0xa8, decoder.AddTask],
  [0xac, decoder.RefreshTaskList],
  [0xb0, decoder.GetEvent],
  [0xb2, decoder.SetEventIndex],
  [0xb4, decoder.GetEventIndex],
  [0xc8, decoder.RestoreDefaultParameters]
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
    */
  encode: function (code, deviceId, object) {
    const request = Buffer.alloc(64)

    request.writeUInt8(0x17, 0)

    if (enc.has(code)) {
      const f = enc.get(code)

      return f(deviceId, object)
    }

    throw errors.InvalidFunctionCode(code)
  },

  /**
    * Decodes a 64 byte received message into the corresponding object.
    *
    * @param {buffer}   buffer     64 byte NodeJS buffer
    *
    * @param {object}   Decoded object (or null)
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

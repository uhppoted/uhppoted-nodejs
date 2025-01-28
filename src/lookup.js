/**
 * Translates UHPPOTE controller codes into human readable text.
 *
 * @module lookup
 * @private
 */

module.exports = {
  /**
   * Expands an event type byte into an object with event code and internationalised
   * event message.
   *
   * @param {array}    bytes      64 byte message as a Uint8Array
   * @param {number}   offset     Index of event type byte in message
   *
   * @param {object}   { code:byte, event:string }
   */
  eventType: function (bytes, offset) {
    const byte = bytes.getUint8(offset, true)

    const event = {
      code: byte,
    }

    switch (byte) {
      case 0x00:
        event.event = '{{none}}'
        break

      case 0x01:
        event.event = '{{card swipe}}'
        break

      case 0x02:
        event.event = '{{door}}'
        break

      case 0x03:
        event.event = '{{alarm}}'
        break

      case 0xff:
        event.event = '{{<overwritten>}}'
        break

      default:
        event.event = '{{unknown}}'
        break
    }

    return event
  },

  /**
   * Expands an event direction byte into an object with event direction and internationalised
   * direction description.
   *
   * @param {array}    bytes      64 byte message as a Uint8Array
   * @param {number}   offset     Index of event direction byte in message
   *
   * @param {object}   { code: byte, direction: string }
   */
  direction: function (bytes, offset) {
    const byte = bytes.getUint8(offset, true)

    const direction = {
      code: byte,
    }

    switch (byte) {
      case 0x01:
        direction.direction = '{{in}}'
        break

      case 0x02:
        direction.direction = '{{out}}'
        break

      default:
        direction.direction = '{{unknown}}'
        break
    }

    return direction
  },

  /**
   * Expands an event reason byte into an object with event reason and internationalised
   * reason description.
   *
   * @param {array}    bytes      64 byte message as a Uint8Array
   * @param {number}   offset     Index of event reason byte in message
   *
   * @param {object}   { code: byte, reason: string }
   */
  reason: function (bytes, offset) {
    const byte = bytes.getUint8(offset, true)

    const reason = {
      code: byte,
    }

    switch (byte) {
      case 1:
        reason.reason = '{{swipe}}'
        break

      case 2:
        reason.reason = '{{swipe open}}'
        break

      case 3:
        reason.reason = '{{swipe close}}'
        break

      case 5:
        reason.reason = '{{swipe:denied (system)}}' // Access is managed by the system not the controller
        break

      case 6:
        reason.reason = '{{no access rights}}' // swipe denied
        break

      case 7:
        reason.reason = '{{incorrect password}}' // swipe denied
        break

      case 8:
        reason.reason = '{{anti-passback}}' // swipe denied
        break

      case 9:
        reason.reason = '{{more cards}}' // swipe denied (absolutely no idea what this means :-()
        break

      case 10:
        reason.reason = '{{first card open}}' // swipe denied (no idea what this means either)
        break

      case 11:
        reason.reason = '{{door is normally closed}}' // swipe denied
        break

      case 12:
        reason.reason = '{{interlock}}' // swipe denied
        break

      case 13:
        reason.reason = '{{not in allowed time period}}' // swipe denied
        break

      case 15:
        reason.reason = '{{invalid timezone}}' // swipe denied
        break

      case 18:
        reason.reason = '{{access denied}}' // swipe denied
        break

      case 20:
        reason.reason = '{{push button ok}}'
        break

      case 23:
        reason.reason = '{{door opened}}'
        break

      case 24:
        reason.reason = '{{door closed}}'
        break

      case 25:
        reason.reason = '{{door opened (supervisor password)}}'
        break

      case 28:
        reason.reason = '{{controller power on}}'
        break

      case 29:
        reason.reason = '{{controller reset}}'
        break

      case 31:
        reason.reason = '{{pushbutton invalid (door locked)}}'
        break

      case 32:
        reason.reason = '{{pushbutton invalid (offline)}}'
        break

      case 33:
        reason.reason = '{{pushbutton invalid (interlock)}}'
        break

      case 34:
        reason.reason = '{{pushbutton invalid (threat)}}'
        break

      case 37:
        reason.reason = '{{door open too long}}'
        break

      case 38:
        reason.reason = '{{forced open}}'
        break

      case 39:
        reason.reason = '{{fire}}'
        break

      case 40:
        reason.reason = '{{forced closed}}'
        break

      case 41:
        reason.reason = '{{theft prevention}}'
        break

      case 42:
        reason.reason = '{{24x7 zone}}'
        break

      case 43:
        reason.reason = '{{emergency}}'
        break

      case 44:
        reason.reason = '{{remote open door}}'
        break

      case 45:
        reason.reason = '{{remote open door (USB reader)}}'
        break

      default:
        reason.reason = '{{(reserved)}}'
        break
    }

    return reason
  },

  /**
   * Expands a status relay state byte into an object with the relays as keys.
   *
   * @param {array}    bytes      64 byte message as a Uint8Array
   * @param {number}   offset     Index of relay state  byte in message
   *
   * @param {object}   { state: byte, 1: open/closed, 2: open/closed, 3: open/closed, 4: open/closed }
   */
  relays: function (bytes, offset) {
    const byte = bytes.getUint8(offset, true)

    const relays = {
      state: byte,
      relays: {
        1: (byte & 0x01) === 1,
        2: (byte & 0x02) === 1,
        3: (byte & 0x03) === 1,
        4: (byte & 0x08) === 1,
      },
    }

    return relays
  },

  /**
   * Expands a status input state byte into an object with the inputs as keys.
   *
   * @param {array}    bytes      64 byte message as a Uint8Array
   * @param {number}   offset     Index of relay state  byte in message
   *
   * @param {object}   { state: byte, forceLock: open/closed, fireAlarm: open/closed }
   */
  inputs: function (bytes, offset) {
    const byte = bytes.getUint8(offset, true)

    const inputs = {
      state: byte,
      forceLock: (byte & 0x01) === 0x01,
      fireAlarm: (byte & 0x02) === 0x02,
    }

    return inputs
  },

  /**
   * Expands a door control byte into a composite object with both the original status byte and a
   * human friendly description.
   *
   * @param {array}    bytes      64 byte message as a Uint8Array
   * @param {number}   offset     Index of door state  byte in message
   *
   * @param {object}   { value: byte, state: 'normally open', 'normally closed', 'controlled' or 'unknown' }
   */
  doorState: function (bytes, offset) {
    const byte = bytes.getUint8(offset, true)

    const control = {
      value: byte,
    }

    switch (byte) {
      case 1:
        control.state = '{{normally open}}'
        break

      case 2:
        control.state = '{{normally closed}}'
        break

      case 3:
        control.state = '{{controlled}}'
        break

      default:
        control.state = '{{unknown}}'
        break
    }

    return control
  },
}

/**
  * Lookup table to associate message text to the equivalent internationalisation key.
  */
const map = {
  unknown: 'unknown',

  // event type
  none: 'eventNone',
  'card swipe': 'eventSwipe',
  door: 'eventDoor',
  alarm: 'eventAlarm',
  '<overwritten>': 'eventOverwritten',

  // event direction
  in: 'directionIn',
  out: 'directionOut',

  // event reason
  swipe: 'swipe',
  'swipe:denied (system)': 'swipeDenied',
  'no access rights': 'noAccess',
  'incorrect password': 'incorrectPassword',
  'anti-passback': 'antiPassback',
  'more cards': 'moreCards',
  'first card open': 'firstCardOpen',
  'door is normally closed': 'doorNormallyClosed',
  interlock: 'interlock',
  'not in allowed time period': 'notInAllowedTimePeriod',
  'invalid timezone': 'invalidTimezone',
  'access denied': 'accessDenied',
  'push button ok': 'pushbuttonOk',
  'door opened': 'doorOpened',
  'door closed': 'doorClosed',
  'door opened (supervisor password)': 'supervisorDoorOpen',
  'controller power on': 'controllerPowerOn',
  'controller reset': 'controllerReset',
  'pushbutton invalid (door locked)': 'pushbuttonDoorLocked',
  'pushbutton invalid (offline)': 'pushbuttonOffline',
  'pushbutton invalid (interlock)': 'pushbuttonInterlock',
  'pushbutton invalid (threat)': 'pushbuttonThreat',
  'door open too long': 'doorOpenTooLong',
  'forced open': 'forcedOpen',
  fire: 'fire',
  'forced closed': 'forcedClosed',
  'theft prevention': 'theftPrevention',
  '24x7 zone': 'zone24x7',
  emergency: 'emergency',
  'remote open door': 'remoteOpenDoor',
  'remote open door (USB reader)': 'usbOpenDoor',
  '(reserved)': 'reserved',

  // doors
  'normally open': 'normallyOpen',
  'normally closed': 'normallyClosed',
  controlled: 'controlled'
}

module.exports = {
  /**
    * Expands an event type byte into an object with event code and internationalised
    * event message.
    *
    * @param {array}    bytes      64 byte message as a Uint8Array
    * @param {number}   offset     Index of event type byte in message
    * @param {function} translator (optional) function to translate event message.
    *
    * @param {object}   { code:byte, event:string }
    *
    * @exports
    */
  eventType: function (bytes, offset, translator) {
    const byte = bytes.getUint8(offset, true)

    const event = {
      code: byte
    }

    switch (byte) {
      case 0x00:
        event.event = translate(translator, 'none')
        break

      case 0x01:
        event.event = translate(translator, 'card swipe')
        break

      case 0x02:
        event.event = translate(translator, 'door')
        break

      case 0x03:
        event.event = translate(translator, 'alarm')
        break

      case 0xff:
        event.event = translate(translator, '<overwritten>')
        break

      default:
        event.event = translate(translator, 'unknown')
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
    * @param {function} translator (optional) function to translate direction description.
    *
    * @param {object}   { code: byte, direction: string }
    *
    * @exports
    */
  direction: function (bytes, offset, translator) {
    const byte = bytes.getUint8(offset, true)

    const direction = {
      code: byte
    }

    switch (byte) {
      case 0x01:
        direction.direction = translate(translator, 'in')
        break

      case 0x02:
        direction.direction = translate(translator, 'out')
        break

      default:
        direction.direction = translate(translator, 'unknown')
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
    * @param {function} translator (optional) function to translate reason description.
    *
    * @param {object}   { code: byte, reason: string }
    *
    * @exports
    */
  reason: function (bytes, offset, translator) {
    const byte = bytes.getUint8(offset, true)

    const reason = {
      code: byte
    }

    switch (byte) {
      case 1:
        reason.reason = translate(translator, 'swipe')
        break

      case 5:
        reason.reason = translate(translator, 'swipe:denied (system)') // Access is managed by the system not the controller
        break

      case 6:
        reason.reason = translate(translator, 'no access rights') // swipe denied
        break

      case 7:
        reason.reason = translate(translator, 'incorrect password') // swipe denied
        break

      case 8:
        reason.reason = translate(translator, 'anti-passback') // swipe denied
        break

      case 9:
        reason.reason = translate(translator, 'more cards') // swipe denied (absolutely no idea what this means :-()
        break

      case 10:
        reason.reason = translate(translator, 'first card open') // swipe denied (no idea what this means either)
        break

      case 11:
        reason.reason = translate(translator, 'door is normally closed') // swipe denied
        break

      case 12:
        reason.reason = translate(translator, 'interlock') // swipe denied
        break

      case 13:
        reason.reason = translate(translator, 'not in allowed time period') // swipe denied
        break

      case 15:
        reason.reason = translate(translator, 'invalid timezone') // swipe denied
        break

      case 18:
        reason.reason = translate(translator, 'access denied') // swipe denied
        break

      case 20:
        reason.reason = translate(translator, 'push button ok')
        break

      case 23:
        reason.reason = translate(translator, 'door opened')
        break

      case 24:
        reason.reason = translate(translator, 'door closed')
        break

      case 25:
        reason.reason = translate(translator, 'door opened (supervisor password)')
        break

      case 28:
        reason.reason = translate(translator, 'controller power on')
        break

      case 29:
        reason.reason = translate(translator, 'controller reset')
        break

      case 31:
        reason.reason = translate(translator, 'pushbutton invalid (door locked)')
        break

      case 32:
        reason.reason = translate(translator, 'pushbutton invalid (offline)')
        break

      case 33:
        reason.reason = translate(translator, 'pushbutton invalid (interlock)')
        break

      case 34:
        reason.reason = translate(translator, 'pushbutton invalid (threat)')
        break

      case 37:
        reason.reason = translate(translator, 'door open too long')
        break

      case 38:
        reason.reason = translate(translator, 'forced open')
        break

      case 39:
        reason.reason = translate(translator, 'fire')
        break

      case 40:
        reason.reason = translate(translator, 'forced closed')
        break

      case 41:
        reason.reason = translate(translator, 'theft prevention')
        break

      case 42:
        reason.reason = translate(translator, '24x7 zone')
        break

      case 43:
        reason.reason = translate(translator, 'emergency')
        break

      case 44:
        reason.reason = translate(translator, 'remote open door')
        break

      case 45:
        reason.reason = translate(translator, 'remote open door (USB reader)')
        break

      default:
        reason.reason = translate(translator, '(reserved)')
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
    *
    * @exports
    */
  relays: function (bytes, offset) {
    const byte = bytes.getUint8(offset, true)

    const relays = {
      state: byte,
      relays: {
        1: (byte & 0x01) === 1,
        2: (byte & 0x02) === 1,
        3: (byte & 0x03) === 1,
        4: (byte & 0x08) === 1
      }
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
    *
    * @exports
    */
  inputs: function (bytes, offset) {
    const byte = bytes.getUint8(offset, true)

    const inputs = {
      state: byte,
      forceLock: (byte & 0x01) === 0x01,
      fireAlarm: (byte & 0x02) === 0x02
    }

    return inputs
  },

  /**
    * Translates a door state Expands a status door state byte into an object with the doors as keys.
    *
    * @param {array}    bytes      64 byte message as a Uint8Array
    * @param {number}   offset     Index of door state  byte in message
    *
    * @param {object}   { value: byte, state: 'normally open', 'normally closed', 'controlled' or 'unknown' }
    *
    * @exports
    */
  doorState: function (bytes, offset, translator) {
    const byte = bytes.getUint8(offset, true)

    const control = {
      value: byte
    }

    switch (byte) {
      case 1:
        control.state = translate(translator, 'normally open')
        break

      case 2:
        control.state = translate(translator, 'normally closed')
        break

      case 3:
        control.state = translate(translator, 'controlled')
        break

      default:
        control.state = translate(translator, 'unknown')
        break
    }

    return control
  }
}

function translate (translator, text) {
  if (translator && Object.keys(map).includes(text)) {
    return translator(map[text])
  }

  return text
}

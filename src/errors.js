const translate = require('./internationalisation.js').translate

function InvalidDeviceID (deviceId, locale) {
  return new Error(translate(`{{invalid device ID}} '${deviceId}'`, locale))
}

function InvalidCardNumber (card, locale) {
  return new Error(`{{invalid card number}} '${card}'`)
}

function InvalidCardIndex (index, locale) {
  return new Error(`{{invalid card index}} '${index}'`)
}

function InvalidDoor (door, locale) {
  return new Error(`{{invalid door}} '${door}'`)
}

function InvalidEventIndex (index, locale) {
  return new Error(`{{invalid event index}} '${index}'`)
}

function InvalidFunctionCode (code, locale) {
  return new Error(`{{invalid protocol function code}} ${code}`)
}

function InvalidDoorControl (control, locale) {
  return new Error(`{{invalid door control}} ${control}`)
}

function NoReply (locale) {
  return new Error('{{no reply}}')
}

function NoReplyFromDevice (deviceId, locale) {
  return new Error(`${deviceId}: {{no reply}}`)
}

function NoReplyToBroadcast (locale) {
  return new Error('{{no reply to broadcasted request}}')
}

function InvalidBroadcastReply (locale) {
  return new Error('{{invalid reply to broadcasted request}}')
}

function Timeout (locale) {
  return new Error('{{timeout}}')
}

module.exports = {
  InvalidDeviceID: InvalidDeviceID,
  InvalidCardNumber: InvalidCardNumber,
  InvalidCardIndex: InvalidCardIndex,
  InvalidDoor: InvalidDoor,
  InvalidEventIndex: InvalidEventIndex,

  InvalidFunctionCode: InvalidFunctionCode,
  InvalidDoorControl: InvalidDoorControl,

  NoReply: NoReply,
  NoReplyFromDevice: NoReplyFromDevice,
  NoReplyToBroadcast: NoReplyToBroadcast,
  InvalidBroadcastReply: InvalidBroadcastReply,
  Timeout: Timeout
}

function InvalidDeviceID (deviceId) {
  return new Error(`invalid device ID '${deviceId}'`)
}

function InvalidCardNumber (card) {
  return new Error(`invalid card number '${card}'`)
}

function InvalidCardIndex (index) {
  return new Error(`invalid card index '${index}'`)
}

function InvalidDoor (door) {
  return new Error(`invalid door '${door}'`)
}

function InvalidEventIndex (index) {
  return new Error(`invalid event index '${index}'`)
}

function InvalidFunctionCode (code) {
  return new Error(`invalid protocol function code ${code}`)
}

function InvalidDoorControl (control) {
  return Error(`invalid door control ${control}`)
}

function NoReply (deviceId) {
  return new Error(`no reply from ${deviceId}`)
}

function InvalidBroadcastReply () {
  return new Error('invalid reply to broadcasted request')
}

function NoBroadcastReply () {
  return new Error('no reply to broadcasted request')
}

function Timeout () {
  return new Error('timeout')
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
  NoBroadcastReply: NoBroadcastReply,
  InvalidBroadcastReply: InvalidBroadcastReply,
  Timeout: Timeout
}

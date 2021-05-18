function validateDeviceId (deviceId) {
  if (!isValidDeviceId(deviceId)) {
    throw new Error(`invalid device ID ${deviceId}`)
  }
}

function validateCardNumber (card) {
  if (!isValidCardNumber(card)) {
    throw new Error(`invalid card number ${card}`)
  }
}

function validateCardIndex (ctx, deviceId, index) {
  if (!isValidCardIndex(index)) {
    throw new Error(`invalid card index ${index}`)
  }
}

function validateDoor (door) {
  if (!isValidDoor(door)) {
    throw new Error(`invalid door ${door}`)
  }
}

function validateEventIndex (index) {
  if (!isValidEventIndex(index)) {
    throw new Error(`invalid event index ${index}`)
  }
}

function isValidDeviceId (deviceId) {
  return validate(deviceId, 1, 4294967295)
}

function isValidCardNumber (card) {
  return validate(card, 1, 4294967295)
}

function isValidCardIndex (index) {
  return validate(index, 0, 4294967295)
}

function isValidDoor (door) {
  return validate(door, 1, 4)
}

function isValidEventIndex (index) {
  return validate(index, 0, 4294967295)
}

function validate (value, min, max) {
  if (!value || Number.isNaN(value)) {
    return false
  }

  if (value < min || value > max) {
    return false
  }

  return true
}

module.exports = {
  validateDeviceId: validateDeviceId,
  validateCardNumber: validateCardNumber,
  validateCardIndex: validateCardIndex,
  validateDoor: validateDoor,
  validateEventIndex: validateEventIndex,

  isValidDeviceId: isValidDeviceId,
  isValidCardNumber: isValidCardNumber,
  isValidCardIndex: isValidCardIndex,
  isValidDoor: isValidDoor,
  isValidEventIndex: isValidEventIndex
}

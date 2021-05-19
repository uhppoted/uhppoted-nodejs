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
  isValidDeviceId: isValidDeviceId,
  isValidCardNumber: isValidCardNumber,
  isValidCardIndex: isValidCardIndex,
  isValidDoor: isValidDoor,
  isValidEventIndex: isValidEventIndex
}

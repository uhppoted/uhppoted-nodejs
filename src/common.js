const config = require('./config.js')
const errors = require('./errors.js')
const log = require('./logger.js')

function initialise (ctx) {
  return new Promise((resolve, reject) => {
    let cfg = new config.Config()
    let locale = 'en-US'

    if (ctx.config) {
      cfg = ctx.config
    }

    if (ctx.locale) {
      locale = ctx.locale
    }

    resolve({
      config: cfg,
      locale: locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })
}

function validate (args, locale) {
  return new Promise((resolve, reject) => {
    Object.entries(args).forEach(([k, v]) => {
      switch (`${k}`) {
        case 'deviceId':
          if (!isValidDeviceId(v)) {
            reject(errors.InvalidDeviceID(v, locale))
          }
          break

        case 'cardNumber':
          if (!isValidCardNumber(v)) {
            reject(errors.InvalidCardNumber(v, locale))
          }
          break

        case 'cardIndex':
          if (!isValidCardIndex(v)) {
            reject(errors.InvalidCardIndex(v, locale))
          }
          break

        case 'door':
          if (!isValidDoor(v)) {
            reject(errors.InvalidDoor(v, locale))
          }
          break

        case 'profileId':
          if (!isValidProfileId(v)) {
            reject(errors.InvalidProfileID(v, locale))
          }
          break

        case 'profile':
          if (!isValidProfileId(v.id)) {
            reject(errors.InvalidProfileID(v.id, locale))
          }
          break

        case 'task':
          if (!isValidTaskType(v.task)) {
            reject(errors.InvalidTaskType(v.task, locale))
          }

          if (!isValidDoor(v.door)) {
            reject(errors.InvalidDoor(v.door, locale))
          }

          break

        case 'eventIndex':
          if (!isValidEventIndex(v)) {
            reject(errors.InvalidEventIndex(v, locale))
          }
          break

        case 'doors':
          ['1', '2', '3', '4'].forEach(door => {
            if (Object.prototype.hasOwnProperty.call(v, door)) {
              const permission = v[door]
              if (!isValidPermission(door, permission)) {
                reject(errors.InvalidPermission(door, permission, locale))
              }
            }
          })
          break
      }
    })

    resolve()
  })
}

function isValidDeviceId (deviceId) {
  return inRange(deviceId, 1, 4294967295)
}

function isValidCardNumber (card) {
  return inRange(card, 1, 4294967295)
}

function isValidCardIndex (index) {
  return inRange(index, 0, 4294967295)
}

function isValidProfileId (profileId) {
  return inRange(profileId, 2, 254)
}

function isValidDoor (door) {
  return inRange(door, 1, 4)
}

function isValidEventIndex (index) {
  return inRange(index, 0, 4294967295)
}

function isValidPermission (door, permission) {
  if (typeof permission === 'boolean') {
    return true
  }

  const profileID = Number(permission)
  if (Number.isNaN(profileID) || !Number.isInteger(profileID) || profileID < 2 || profileID > 254) {
    return false
  }

  return true
}

function isValidTaskType (task) {
  const tasks = new Map([
    ['doorcontrolled', 0],
    ['doornormallyopen', 1],
    ['doornormallyclosed', 2],
    ['disabletimeprofile', 3],
    ['enabletimeprofile', 4],
    ['cardnopassword', 5],
    ['cardinpassword', 6],
    ['cardpassword', 7],
    ['enablemorecards', 8],
    ['disablemorecards', 9],
    ['triggeronce', 10],
    ['disablepushbutton', 11],
    ['enablepushbutton', 12]
  ])

  if (isNaN(task)) {
    return tasks.has(task.replace(/[^a-z]+/ig, ''))
  }

  return inRange(task, 1, 13)
}

function inRange (value, min, max) {
  if (!value || Number.isNaN(value)) {
    return false
  }

  if (value < min || value > max) {
    return false
  }

  return true
}

module.exports = {
  initialise: initialise,
  validate: validate
}

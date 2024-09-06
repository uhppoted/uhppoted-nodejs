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
      locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    })
  })
}

function resolve (controller) {
  if (typeof (controller) === 'number') {
    return { id: controller, address: null, protocol: 'udp' }
  }

  if (typeof (controller) === 'object') {
    const { id, address = null, protocol = 'udp' } = controller
    const proto = `${protocol}`.toLowerCase() === 'tcp' ? 'tcp' : 'udp'

    if ((address != null) && (typeof (address) === 'string')) {
      const match = `${address}`.match(/^(.+?):([0-9]+)$/)

      if (match) {
        const addr = match[1]
        const port = parseInt(match[2], 10)

        return { id, address: { address: addr, port }, protocol: proto }
      } else {
        return { id, address: { address, port: 60000 }, protocol: proto }
      }
    }

    if ((address != null) && (typeof (address) === 'object')) {
      const { address: addr, port } = address
      const p = parseInt(`${port}`)

      if (!Number.isNaN(p) && p > 0 && p < 65536) {
        return { id, address: { address: addr, port: p }, protocol: proto }
      } else {
        return { id, address: { address: addr, port: 60000 }, protocol: proto }
      }
    }

    return { id, address, protocol: 'udp' }
  }
}

function validate (args, locale) {
  return new Promise((resolve, reject) => {
    Object.entries(args).forEach(([k, v]) => {
      switch (`${k}`) {
        case 'controller':
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

        case 'PIN':
          if (!isValidPIN(v)) {
            reject(errors.InvalidCardPIN(v, locale))
          }
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
  return inRange(index, 1, 4294967295)
}

function isValidProfileId (profileId) {
  return inRange(profileId, 2, 254)
}

function isValidDoor (door) {
  return inRange(door, 1, 4)
}

function isValidPIN (pin) {
  return inRange(pin, 0, 999999)
}

function isValidEventIndex (index) {
  return inRange(index, 1, 4294967295)
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
  const v = Number.parseInt(`${value}`)

  if (Number.isNaN(v) || v < min || v > max) {
    return false
  }

  return true
}

function clamp (v, min, max) {
  return Math.min(Math.max(v, min), max)
}

module.exports = {
  initialise,
  validate,
  resolve,
  clamp
}

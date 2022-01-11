/**
 * UHPPOTE controller API implementation.
 * @module uhppoted
 */

const broadcast = require('./driver.js').broadcast
const get = require('./driver.js').get
const set = require('./driver.js').set
const send = require('./driver.js').send
const listen = require('./driver.js').listen
const opcodes = require('./opcodes.js')
const errors = require('./errors.js')
const translate = require('./internationalisation.js').translate
const log = require('./logger.js')
const validate = require('./common.js').validate
const initialise = require('./common.js').initialise

module.exports = {
  /**
   * Discovers UHPPOTE controllers accessible on the local LAN.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   *
   * @example
   * uhppoted.getDevices(ctx)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getDevices: function (ctx) {
    return validate({ }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => broadcast(context, opcodes.GetDevice, {}))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves device information for a single UHPPOTE access controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   *
   * @example
   * uhppoted.getDevice(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getDevice: function (ctx, deviceId) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetDevice, {}))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Sets the IP address, subnet mask and gateway address for a UHPPOTE access controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {string} address - IPv4 address assigned to controller
   * @param {string} netmask - IPv4 subnet mask assigned to controller
   * @param {string} gateway - IPv4 LAN gateway address for controller
   *
   * @example
   * uhppoted.setIP(ctx, 405419896, '192.168.1.100', '255.255.255.0', '192.168.1.1')
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setIP: function (ctx, deviceId, address, netmask, gateway) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => send(context, deviceId, opcodes.SetIP, { address: address, netmask: netmask, gateway: gateway }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves the IP address and port to which the controller is configured to send events.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   *
   * @example
   * uhppoted.getListener(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getListener: function (ctx, deviceId) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetListener, {}))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Sets the IP address and port to which the controller should send events.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {string} address - IPv4 address of event listener
   * @param {int}    port - IPv4 UDP port of event listener
   *
   * @example
   * uhppoted.setListener(ctx, 405419896, '192.168.1.100', 600001)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setListener: function (ctx, deviceId, address, port) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => set(context, deviceId, opcodes.SetListener, { address: address, port: port }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves the controller current date and time.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   *
   * @example
   * uhppoted.getTime(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getTime: function (ctx, deviceId) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetTime, {}))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Sets the controller date and time.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {string} datetime - Date and time (YYYY-mm-dd HH:mm:ss)
   *
   * @example
   * uhppoted.setTime(ctx, 405419896, '2021-06-04 15:25:43')
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setTime: function (ctx, deviceId, datetime) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => set(context, deviceId, opcodes.SetTime, { datetime }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves the door unlock duration and control mode settings from a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {uint}   door - Door ID in the range [1..4]
   *
   * @example
   * uhppoted.getDoorControl(ctx, 405419896, 3)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getDoorControl: function (ctx, deviceId, door) {
    return validate({ deviceId: deviceId, door: door }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetDoorControl, { door: door }))
      .then(response => translate(response, ctx.locale))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Sets the door unlock duration and control mode from a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {uint}   door - Door ID in the range [1..4]
   * @param {uint}   delay - Door unlock duration (seconds)
   * @param {string} mode - Door control mode ('normally open', 'normally closed' or 'controlled')
   *
   * @example
   * uhppoted.setDoorControl(ctx, 405419896, 3, 5, 'controlled')
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setDoorControl: function (ctx, deviceId, door, delay, mode) {
    let control = 0x00

    switch (mode) {
      case 'normally open':
        control = opcodes.NormallyOpen
        break

      case 'normally closed':
        control = opcodes.NormallyClosed
        break

      case 'controlled':
        control = opcodes.Controlled
        break

      default:
        throw errors.InvalidDoorControl(mode, ctx.locale)
    }

    return validate({ deviceId: deviceId, door: door }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => set(context, deviceId, opcodes.SetDoorControl, { door: door, delay: delay, control: control }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Enables or disables door open and closed input events.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {bool}   enable - Enable/disable door open/close events
   *
   * @example
   * uhppoted.recordSpecialEvents(ctx, 405419896, true)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  recordSpecialEvents: function (ctx, deviceId, enable) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => set(context, deviceId, opcodes.RecordSpecialEvents, { enable: enable }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves the controller status, including the most recent event (if any).
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   *
   * @example
   * uhppoted.getStatus(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getStatus: function (ctx, deviceId) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetStatus, {}))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves the number of cards records stored in the controller (including deleted cards).
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   *
   * @example
   * uhppoted.getCards(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getCards: function (ctx, deviceId) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetCards, {}))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves the card record for a card number from a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {uint}   card - Card number
   *
   * @example
   * uhppoted.getCard(ctx, 405419896, 8165538)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getCard: function (ctx, deviceId, card) {
    return validate({ deviceId: deviceId, cardNumber: card }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetCardByID, { card: card }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves the card record at the index from a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {uint}   index - Record index
   *
   * @example
   * uhppoted.getCardByIndex(ctx, 405419896, 23)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getCardByIndex: function (ctx, deviceId, index) {
    return validate({ deviceId: deviceId, cardIndex: index }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetCardByIndex, { index: index }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Creates or updates a card record on a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {uint}   card - Card number
   * @param {string} validFrom - Date from which card is valid (YYYY-mm-dd)
   * @param {string} validUntil - Date ater which card is no longer valid (YYYY-mm-dd)
   * @param {object} doors - map of doors and associated access permissions. A permission
   *                         may be true, false or a time profile in the range [2..254].
   *
   * @example
   * uhppoted.putCard(ctx, 405419896, 8165538, '2021-01-01', '2021-12-31', { 1: true, 2: false, 3: 29, 4: true })
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  putCard: function (ctx, deviceId, card, validFrom, validUntil, doors) {
    return validate({ deviceId: deviceId, cardNumber: card, doors: doors }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => set(context, deviceId, opcodes.PutCard, { card: card, from: validFrom, to: validUntil, doors: doors }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Deletes a card record from a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {uint}   card - Card number
   *
   * @example
   * uhppoted.deleteCard(ctx, 405419896, 8165538)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  deleteCard: function (ctx, deviceId, card) {
    return validate({ deviceId: deviceId, cardNumber: card }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => set(context, deviceId, opcodes.DeleteCard, { card: card }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Erases all card records from a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   *
   * @example
   * uhppoted.deleteCards(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  deleteCards: function (ctx, deviceId) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => set(context, deviceId, opcodes.DeleteCards, {}))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves a time profile from a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint32} deviceId - Controller serial number
   * @param {uint8}  profileId - Time profile ID ([2..254])
   *
   * @example
   * uhppoted.getTimeProfile(ctx, 405419896, 29)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getTimeProfile: function (ctx, deviceId, profileId) {
    return validate({ deviceId: deviceId, profileId: profileId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetTimeProfile, { profileId: profileId }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Defines a time profile on a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint32} deviceId - Controller serial number
   * @param {object} profile - Time profile
   *
   * @example
   * uhppoted.setTimeProfile(ctx, 405419896, {...})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setTimeProfile: function (ctx, deviceId, profile) {
    return validate({ deviceId: deviceId, profile: profile }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.SetTimeProfile, { profile: profile }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Deletes all time profiles from a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint32} deviceId - Controller serial number
   *
   * @example
   * uhppoted.clearTimeProfiles(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  clearTimeProfiles: function (ctx, deviceId) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.ClearTimeProfiles, {}))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Clears the task list on a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint32} deviceId - Controller serial number
   *
   * @example
   * uhppoted.clearTaskList(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  clearTaskList: function (ctx, deviceId) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.ClearTaskList, {}))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Adds a task to the controller's task list. the task is not activated until refreshTaskList is
   * invoked.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint32} deviceId - Controller serial number
   * @param {object} task - Task definition
   *
   * @example
   * uhppoted.addTask(ctx, 405419896, {...})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  addTask: function (ctx, deviceId, task) {
    return validate({ deviceId: deviceId, task: task }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.AddTask, { task: task }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Refreshes the task list on a controller to activate the added tasks.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint32} deviceId - Controller serial number
   *
   * @example
   * uhppoted.refreshTaskList(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  refreshTaskList: function (ctx, deviceId) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.RefreshTaskList, {}))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves the indices of the first and last event records stored on a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   *
   * @example
   * uhppoted.getEvents(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getEvents: function (ctx, deviceId) {
    const first = validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetEvent, { index: 0 }))

    const last = validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetEvent, { index: 0xffffffff }))

    const promise = Promise.all([first, last]).then(([p, q]) => {
      const object = { deviceId: deviceId, first: 0, last: 0 }

      if (p && p.event) {
        object.first = p.event.index
      }

      if (q && q.event) {
        object.last = q.event.index
      }

      return object
    })

    return promise
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Retrieves the event record stored at the index from a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {uint}   index - Event index
   *
   * @example
   * uhppoted.getEvent(ctx, 405419896, 29)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getEvent: function (ctx, deviceId, index) {
    return validate({ deviceId: deviceId, eventIndex: index }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetEvent, { index: index }))
      .then(response => {
        if (response && response.event && response.event.type && response.event.type.code && response.event.type.code === 255) {
          throw errors.EventOverwritten(deviceId, index, ctx.locale)
        }

        if (response && response.event && response.event.index === 0) {
          throw errors.MissingEvent(deviceId, index, ctx.locale)
        }

        return translate(response, ctx.locale)
      })
  },

  /**
   * Retrieves the 'user event index' value from a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   *
   * @example
   * uhppoted.getEventIndex(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getEventIndex: function (ctx, deviceId) {
    return validate({ deviceId: deviceId }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => get(context, deviceId, opcodes.GetEventIndex, { }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Sets the 'user event index' value on a controller.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {uint}   index - User event index value
   *
   * @example
   * uhppoted.setEventIndex(ctx, 405419896, 47)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setEventIndex: function (ctx, deviceId, index) {
    return validate({ deviceId: deviceId, eventIndex: index }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => set(context, deviceId, opcodes.SetEventIndex, { index: index }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Remotely unlocks a door.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {uint}   deviceId - Controller serial number
   * @param {uint}   door - Door ([1..4])
   *
   * @example
   * uhppoted.openDoor(ctx, 405419896, 3)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  openDoor: function (ctx, deviceId, door) {
    return validate({ deviceId: deviceId, door: door }, ctx.locale)
      .then(ok => initialise(ctx))
      .then(context => set(context, deviceId, opcodes.OpenDoor, { door: door }))
      .then(response => translate(response, ctx.locale))
  },

  /**
   * Establishes a listening connection for controller events. Returns a listener object with
   * a close function that can be invoked when the listener should be shut down.
   *
   * @param {object} ctx - Context with configuration, locale (optional) and logger (optional).
   * @param {function} onEvent - Handler for received events
   * @param {function} onError - Handler for non-fatal errors
   *
   * @example
   * uhppoted.listen(ctx, (event) => { console.log(event) }, (err) => { console.log(err.toString()) })
   *  .then(listener => { ... })
   *  .catch(err => { console.log(`${err.message}`)
   */
  listen: function (ctx, onEvent, onError) {
    const context = {
      config: ctx.config,
      locale: ctx.locale,
      logger: ctx.logger ? ctx.logger : (m) => { log(m) }
    }

    const handler = {
      received: function (event) {
        if (onEvent) {
          onEvent(translate(event, ctx.locale))
        }
      },

      onerror: function (err) {
        if (onError) {
          onError(err)
        }
      }
    }

    const socket = listen(context, handler)

    return {
      close: function () {
        if (socket) {
          socket.close()
        }
      }
    }
  }
}

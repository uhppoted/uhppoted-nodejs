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
const resolve = require('./common.js').resolve
const clamp = require('./common.js').clamp
const initialise = require('./common.js').initialise

module.exports = {
  /**
   * Discovers UHPPOTE controllers accessible on the local LAN.
   *
   * @param {object} ctx  Context with configuration, locale (optional) and logger (optional).
   *
   * @example
   * uhppoted.getDevices(ctx)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getDevices: function (ctx) {
    return validate({}, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) => broadcast(context, opcodes.GetDevice, {}))
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves device information for a single UHPPOTE access controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.getDevice(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getDevice(ctx, {id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getDevice: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.GetDevice, {}, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Sets the IP address, subnet mask and gateway address for a UHPPOTE access controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {string} address     IPv4 address assigned to controller
   * @param {string} netmask     IPv4 subnet mask assigned to controller
   * @param {string} gateway     IPv4 LAN gateway address for controller
   *
   * @example
   * uhppoted.setIP(ctx, 405419896, '192.168.1.100', '255.255.255.0', '192.168.1.1')
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.setIP(ctx, {id:405419896, address:'192.168.1.100', protocol:'tcp'}, 192.168.1.100', '255.255.255.0', '192.168.1.1')
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setIP: function (ctx, controller, address, netmask, gateway) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        send(
          context,
          id,
          opcodes.SetIP,
          { address, netmask, gateway },
          addr,
          protocol,
        ),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves the IPv4 address and port to which the controller is configured to send events, as well as
   * the auto-send interval.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.getListener(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getListener(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getListener: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.GetListener, {}, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Sets the IPv4 address and port to which the controller should send events, as well as the auto-send
   * interval for the current status and most recent event.
   *
   * @param {object}      ctx  Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}   controller.id       Controller serial number
   * @param {string} controller.address  Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string} controller.protocol Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                     'udp' unless 'tcp'
   * @param {string} address   IPv4 address of event listener
   * @param {int}    port      IPv4 UDP port of event listener
   * @param {uint8}  interval  Auto-send interval (seconds, in the range [0..255]). A zero value
   *                           (default) disables auto-send.
   *
   * @example
   * uhppoted.setListener(ctx, 405419896, '192.168.1.100', 600001, 15)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.setListener(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp' }, '192.168.1.100', 600001,15)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setListener: function (ctx, controller, address, port, interval) {
    const { id, address: addr, protocol } = resolve(controller)
    const autosend = Number.isNaN(interval) ? 0 : clamp(interval, 0, 255)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(
          context,
          id,
          opcodes.SetListener,
          { address, port, interval: autosend },
          addr,
          protocol,
        ),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves the controller current date and time.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.getTime(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getTime(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getTime: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) => get(context, id, opcodes.GetTime, {}, addr, protocol))
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Sets the controller date and time.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {string} datetime    Date and time (YYYY-mm-dd HH:mm:ss)
   *
   * @example
   * uhppoted.setTime(ctx, 405419896, '2021-06-04 15:25:43')
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.setTime(ctx, {id:405419896, address:'192.168.1.100', protocol:'tcp'}, '2021-06-04 15:25:43')
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setTime: function (ctx, controller, datetime) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(context, id, opcodes.SetTime, { datetime }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves the door unlock duration and control mode settings from a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint} door  Door ID in the range [1..4]
   *
   * @example
   * uhppoted.getDoorControl(ctx, 405419896, 3)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getDoorControl(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 3)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getDoorControl: function (ctx, controller, door) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, door }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.GetDoorControl, { door }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Sets the door unlock duration and control mode from a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint}   door   Door ID in the range [1..4]
   * @param {uint}   delay  Door unlock duration (seconds)
   * @param {string} mode   Door control mode ('normally open', 'normally closed' or 'controlled')
   *
   * @example
   * uhppoted.setDoorControl(ctx, 405419896, 3, 5, 'controlled')
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.setDoorControl(ctx, {id:405419896, address:'192.168.1.100', protocol:'tcp'}, 3, 5, 'controlled')
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setDoorControl: function (ctx, controller, door, delay, mode) {
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

    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, door }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(
          context,
          id,
          opcodes.SetDoorControl,
          { door, delay, control },
          addr,
          protocol,
        ),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Enables or disables door open and closed input events.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.recordSpecialEvents(ctx, 405419896, true)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.recordSpecialEvents(ctx, , { id:405419896, address:'192.168.1.100', protocol:'tcp'}, true)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  recordSpecialEvents: function (ctx, controller, enable) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(
          context,
          id,
          opcodes.RecordSpecialEvents,
          { enable },
          addr,
          protocol,
        ),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves the controller status, including the most recent event (if any).
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.getStatus(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getStatus(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getStatus: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.GetStatus, {}, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves the number of cards records stored in the controller (including deleted cards).
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.getCards(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getCards(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getCards: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) => get(context, id, opcodes.GetCards, {}, addr, protocol))
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves the card record for a card number from a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint}   card        Card number
   *
   * @example
   * uhppoted.getCard(ctx, 405419896, 10058400)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getCard(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 10058400)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getCard: function (ctx, controller, card) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, cardNumber: card }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.GetCardByID, { card }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves the card record at the index from a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint}   index       Record index
   *
   * @example
   * uhppoted.getCardByIndex(ctx, 405419896, 23)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getCardByIndex(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 23)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getCardByIndex: function (ctx, controller, index) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, cardIndex: index }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.GetCardByIndex, { index }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Creates or updates a card record on a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint}   card        Card number
   * @param {string} validFrom   Date from which card is valid (YYYY-mm-dd)
   * @param {string} validUntil  Date ater which card is no longer valid (YYYY-mm-dd)
   * @param {object} doors       map of doors and associated access permissions. A permission
   *                             may be true, false or a time profile in the range [2..254].
   * @param {uint}   PIN         Optional card keypad PIN code (in the range [0..999999])
   *
   * @example
   * uhppoted.putCard(ctx, 405419896, 8165538, '2021-01-01', '2021-12-31', { 1: true, 2: false, 3: 29, 4: true }, 7531)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.putCard(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 8165538, '2021-01-01', '2021-12-31', { 1: true, 2: false, 3: 29, 4: true }, 7531)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  putCard: function (ctx, controller, card, validFrom, validUntil, doors, PIN) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, cardNumber: card, doors }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(
          context,
          id,
          opcodes.PutCard,
          { card, from: validFrom, to: validUntil, doors, PIN },
          addr,
          protocol,
        ),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Deletes a card record from a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint}   card        Card number
   *
   * @example
   * uhppoted.deleteCard(ctx, 405419896, 10058400)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.deleteCard(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 10058400)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  deleteCard: function (ctx, controller, card) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, cardNumber: card }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(context, id, opcodes.DeleteCard, { card }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Erases all card records from a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.deleteCards(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.deleteCards(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  deleteCards: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(context, id, opcodes.DeleteCards, {}, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves a time profile from a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint8}  profile   Time profile ID ([2..254])
   *
   * @example
   * uhppoted.getTimeProfile(ctx, 405419896, 29)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getTimeProfile(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 29)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getTimeProfile: function (ctx, controller, profile) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, profileId: profile }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(
          context,
          id,
          opcodes.GetTimeProfile,
          { profileId: profile },
          addr,
          protocol,
        ),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Defines a time profile on a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {object} profile     Time profile
   *
   * @example
   * uhppoted.setTimeProfile(ctx, 405419896, {...})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.setTimeProfile(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, {...})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setTimeProfile: function (ctx, controller, profile) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, profile }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.SetTimeProfile, { profile }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Deletes all time profiles from a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.clearTimeProfiles(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.clearTimeProfiles(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  clearTimeProfiles: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.ClearTimeProfiles, {}, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Clears the task list on a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.clearTaskList(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.clearTaskList(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  clearTaskList: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.ClearTaskList, {}, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Adds a task to the controller's task list. the task is not activated until refreshTaskList is
   * invoked.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {object} task        Task definition
   *
   * @example
   * uhppoted.addTask(ctx, 405419896, {...})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.addTask(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, {...})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  addTask: function (ctx, controller, task) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, task }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.AddTask, { task }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Refreshes the task list on a controller to activate the added tasks.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.refreshTaskList(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.refreshTaskList(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  refreshTaskList: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.RefreshTaskList, {}, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves the indices of the first and last event records stored on a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.getEvents(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getEvents(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getEvents: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    const first = validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.GetEvent, { index: 0 }, addr, protocol),
      )

    const last = validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(
          context,
          id,
          opcodes.GetEvent,
          { index: 0xffffffff },
          addr,
          protocol,
        ),
      )

    const promise = Promise.all([first, last]).then(([p, q]) => {
      const object = { deviceId: id, first: 0, last: 0 }

      if (p && p.event) {
        object.first = p.event.index
      }

      if (q && q.event) {
        object.last = q.event.index
      }

      return object
    })

    return promise.then((response) => translate(response, ctx.locale))
  },

  /**
   * Retrieves the event record stored at the index from a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint}   index       Event index
   *
   * @example
   * uhppoted.getEvent(ctx, 405419896, 29)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getEvent(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 29)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getEvent: function (ctx, controller, index) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, eventIndex: index }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.GetEvent, { index }, addr, protocol),
      )
      .then((response) => {
        if (
          response &&
          response.event &&
          response.event.type &&
          response.event.type.code &&
          response.event.type.code === 255
        ) {
          throw errors.EventOverwritten(controller, index, ctx.locale)
        }

        if (response && response.event && response.event.index === 0) {
          throw errors.MissingEvent(controller, index, ctx.locale)
        }

        return translate(response, ctx.locale)
      })
  },

  /**
   * Retrieves the 'user event index' value from a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.getEventIndex(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.getEventIndex(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  getEventIndex: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        get(context, id, opcodes.GetEventIndex, {}, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Sets the 'user event index' value on a controller.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint}   index       User event index value
   *
   * @example
   * uhppoted.setEventIndex(ctx, 405419896, 47)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.setEventIndex(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 47)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setEventIndex: function (ctx, controller, index) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, eventIndex: index }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(context, id, opcodes.SetEventIndex, { index }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Remotely unlocks a door.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint}   door        Door ([1..4])
   *
   * @example
   * uhppoted.openDoor(ctx, 405419896, 3)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.openDoor(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 3)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  openDoor: function (ctx, controller, door) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id, door }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(context, id, opcodes.OpenDoor, { door }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Enables or disables remote access control. When enabled, the controller expects a remote
   * host to listen for card swipe events and open the associated door (after verifying the card
   * access permissions). In remote access control mode, the controller will revert to local
   * access control if it hasn't received any communication from the host within the last 30
   * seconds (any command is sufficient - a set-pc-control command is not required). A controller
   * will reassert remote control mode on receipt of any message from the host if it has reverted
   * to local access management.
   *
   * Remote access control mode is not volatile and persists across controller restarts.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {bool}   enable      Enable/disable remote access control
   *
   * @example
   * uhppoted.setPCControl(ctx, 405419896, true)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.setPCControl(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, true)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setPCControl: function (ctx, controller, enable) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(context, id, opcodes.SetPCControl, { enable }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Sets the controller door interlock mode:
   * - 0: no interlock
   * - 1: doors 1 & 2 interlocked
   * - 2: doors 3 & 4 interlocked
   * - 3: doors 1 & 2 and doors 3 & 4 interlocked
   * - 4: doors 1 & 2 & 3 interlocked
   * - 8: doors 1 & 2 & 3 & 4 interlocked
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint}   interlock   Interlock mode (0,1,2,3,4 or 8)
   *
   * @example
   * uhppoted.setInterlock(ctx, 405419896, 3)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.setInterlock(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 3)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setInterlock: function (ctx, controller, interlock) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(context, id, opcodes.SetInterlock, { interlock }, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Activates and deactivates a controller's reader access keypads. The controller does not
   * provide the functionality to activate/deactivate keypads individually so any keypads not
   * explicitly listed as activated will be deactivated.
   *
   * Remote access control mode is not volatile and persists across controller restarts.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {object} keypads     Object with activated/deactivated keypads:
   *                             {
   *                                1: true/false,
   *                                2: true/false,
   *                                3: true/false,
   *                                4: true/false
   *                             }
   *
   * @example
   * uhppoted.activateKeypads(ctx, 405419896, {1:true, 2:true, 3:false, 4: true})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.activateKeypads(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, {1:true, 2:true, 3:false, 4: true})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  activateKeypads: function (ctx, controller, keypads) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(
          context,
          id,
          opcodes.ActivateKeypads,
          {
            keypads: {
              1: !!keypads['1'],
              2: !!keypads['2'],
              3: !!keypads['3'],
              4: !!keypads['4'],
            },
          },
          addr,
          protocol,
        ),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Sets the supervisor passcodes assigned to a controller door.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   * @param {uint}   door        Door [1..4] to which super passwords are assigned
   * @param {array}  passcodes   Array of up to 4 passcodes in the range [1..999999]. Invalid
   *                             passcodes will be configued as 0 ('no code')
   *
   * @example
   * uhppoted.setDoorPasscodes(ctx, 405419896, 3, [12345,999999,54321]})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.setDoorPasscodes(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'}, 3, [12345,999999,54321]})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  setDoorPasscodes: function (ctx, controller, door, passcodes) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(
          context,
          id,
          opcodes.SetDoorPasscodes,
          {
            door,
            passcodes,
          },
          addr,
          protocol,
        ),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Resets the controller configuration to the manufacturer default settings.
   *
   * @param {object}      ctx         Context with configuration, locale (optional) and logger (optional).
   * @param {uint|object} controller  Either a controller serial number (legacy implementation) or an
   *                                  object of the form { controller, address, protocol }:
   * @param {uint}        controller.id        Controller serial number
   * @param {string}      controller.address   Optional controller IPv4 address. Defaults to UDP broadcast.
   * @param {string}      controller.protocol  Optional connection protocol ('udp' or 'tcp'). Defaults to
   *                                           'udp' unless 'tcp'
   *
   * @example
   * uhppoted.restoreDefaultParameters(ctx, 405419896)
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   *
   * @example
   * uhppoted.restoreDefaultParameters(ctx, { id:405419896, address:'192.168.1.100', protocol:'tcp'})
   *  .then(response => { console.log(response) })
   *  .catch(err => { console.log(`${err.message}`)
   */
  restoreDefaultParameters: function (ctx, controller) {
    const { id, address: addr, protocol } = resolve(controller)

    return validate({ controller: id }, ctx.locale)
      .then(() => initialise(ctx))
      .then((context) =>
        set(context, id, opcodes.RestoreDefaultParameters, {}, addr, protocol),
      )
      .then((response) => translate(response, ctx.locale))
  },

  /**
   * Establishes a listening connection for controller events. Returns a listener object with
   * a close function that can be invoked when the listener should be shut down.
   *
   * @param {object}   ctx      Context with configuration, locale (optional) and logger (optional).
   * @param {function} onEvent  Handler for received events
   * @param {function} onError  Handler for non-fatal errors
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
      logger: ctx.logger
        ? ctx.logger
        : (m) => {
            log(m)
          },
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
      },
    }

    const socket = listen(context, handler)

    return {
      close: function () {
        if (socket) {
          socket.close()
        }
      },
    }
  },
}

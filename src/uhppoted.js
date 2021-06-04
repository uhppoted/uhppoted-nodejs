/**
 * UHPPOTE controller API implementation.
 * @module uhppoted
 */

const broadcast = require('./driver.js').broadcast
const get = require('./driver.js').get
const set = require('./driver.js').set
const send = require('./driver.js').send
const opcodes = require('./opcodes.js')
const translate = require('./internationalisation.js').translate
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
  }
}

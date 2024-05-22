/**
 * Implements the functions required to send and receive UHPPOTE controller messages.
 *
 * @module driver
 * @private
 */

const codec = require('./codec.js')
const errors = require('./errors.js')
const dgram = require('dgram')
const net = require('net')
const os = require('os')
const ip = require('ip')
const opts = { type: 'udp4', reuseAddr: true }

module.exports = {
  /**
    * Executes a 'get' command to retrieve information from a UHPPOTE access controller.
    * 'get' and 'set' are functionally identical but are defined separately for
    * semantic clarity.
    *
    * @param {object}   ctx      Configuration, logger and debug flags
    * @param {number}   deviceId The serial number for the target access controller
    * @param {byte}     op       Operation code from 'opcode' module
    * @param {object}   request  Operation parameters for use by codec.encode
    * @param {string}   dest     Optional controller IPv4 address. Defaults to UDP broadcast.
    * @param {string}   protocol Optional connection protocol ('udp' or 'tcp'). Defaults to
    *                            'udp' unless 'tcp'
    *
    * @param {object}   Decoded reply containing the received information
    */
  get: async function (ctx, deviceId, op, request, dest = null, protocol = 'udp') {
    const c = context(deviceId, ctx.config, ctx.logger, ctx.locale)
    const receiver = receiveAny(c.timeout, ctx.locale)

    const decode = function (reply) {
      if (reply) {
        const response = codec.decode(reply)

        if (response && (response.deviceId === c.deviceId)) {
          return response
        }
      }

      throw errors.NoReplyFromDevice(deviceId, ctx.locale)
    }

    if (dest != null && dest !== '' && protocol === 'tcp') {
      const addr = { address: dest, port: 60000 }
      return tcp(c, addr, op, request, receiver).then(decode)
    } else {
      return udp(c, op, request, receiver).then(decode)
    }
  },

  /**
    * Executes a 'set' command to update information on a UHPPOTE access controller.
    * 'get' and 'set' are functionally identical but are defined separately for
    * semantic clarity.
    *
    * @param {object}   ctx      Configuration, internationalisation translation and logger
    * @param {number}   deviceId The serial number for the target access controller
    * @param {byte}     op       Operation code from 'opcode' module
    * @param {object}   request  Operation parameters for use by codec.encode
    * @param {string}   dest     Optional controller IPv4 address. Defaults to UDP broadcast.
    * @param {string}   protocol Optional connection protocol ('udp' or 'tcp'). Defaults to
    *                            'udp' unless 'tcp'
    *
    * @param {object}  Decoded result of the operation
    */
  set: async function (ctx, deviceId, op, request, dest = null, protocol = 'udp') {
    const c = context(deviceId, ctx.config, ctx.logger)
    const receiver = receiveAny(c.timeout, ctx.locale)

    const decode = function (reply) {
      if (reply) {
        const response = codec.decode(reply)
        if (response && (response.deviceId === c.deviceId)) {
          return response
        }
      }

      throw errors.NoReplyFromDevice(deviceId, ctx.locale)
    }

    return udp(c, op, request, receiver).then(decode)
  },

  /**
    * Sends a command to update information on a UHPPOTE access controller without
    * expecting a reply. Used solely by the 'set-ip' node - the UHPPOTE access controller
    * does not reply to the set IP command.
    *
    * @param {object}   ctx      Configuration, internationalisation translation and logger
    * @param {number}   deviceId The serial number for the target access controller
    * @param {byte}     op       Operation code from 'opcode' module
    * @param {object}   request  Operation parameters for use by codec.encode
    */
  send: async function (ctx, deviceId, op, request) {
    const c = context(deviceId, ctx.config, ctx.logger)

    const receiver = new Promise((resolve, reject) => {
      resolve()
    })

    const decode = function (reply) {
      return {}
    }

    receiver.received = (message) => {}
    receiver.cancel = () => { }

    return udp(c, op, request, receiver).then(decode)
  },

  /**
    * Broadcasts a command to retrieve information from all responding UHPPOTE access
    * controllers. In this implementation it is used exclusively by the 'get-devices'
    * node.
    *
    * It differs from 'get' in that it waits for a timeout before returning an array of
    * received responses rather than returning the first received response. It also
    * explicity issues a UDP broadcast message - 'get' will issue a UDP 'sendto' if
    * possible.
    *
    * @param {object}   ctx      Configuration, internationalisation translation and logger
    * @param {byte}     op       Operation code from 'opcode' module
    * @param {object}   request  Operation parameters for use by codec.encode
    *
    * @param {array} Array of Javascript objects from codec.decode containing the decoded
    *                received responses.
    */
  broadcast: async function (ctx, op, request) {
    const c = context(0, ctx.config, ctx.logger)
    const replies = []

    const receiver = new Promise((resolve, reject) => {
      setTimeout(() => { resolve(replies) }, c.timeout)
    })

    const decode = function (replies) {
      if (replies) {
        return replies.map((m) => {
          const response = codec.decode(m)
          if (response) {
            return response
          }

          throw errors.InvalidBroadcastReply(ctx.locale)
        })
      }

      throw errors.NoReplyToBroadcast(ctx.locale)
    }

    receiver.received = (message) => {
      replies.push(new Uint8Array(message))
    }

    receiver.cancel = () => { }

    return udp(c, op, request, receiver).then(decode)
  },

  /**
    * Establishes a 'listening' UDP connection on the 'listen' port defined in the
    * configuration to receive events from UHPPOTE access controllers configured
    * to send events to this host:port. Received events are forwarded to the
    * supplied handler for dispatch to the application.
    *
    * @param {object}   ctx      Configuration, internationalisation translation and logger
    * @param {function} handler  Function to invoke with received event
    */
  listen: function (ctx, handler) {
    const c = context(0, ctx.config, ctx.logger)
    const sock = dgram.createSocket(opts)

    sock.on('error', (err) => {
      handler.onerror(err)
    })

    sock.on('message', (message, rinfo) => {
      log(c.debug, 'received', message, rinfo)

      const event = codec.decode(message)

      if (event) {
        handler.received(event)
      }
    })

    sock.bind({
      address: c.listen.address,
      port: c.listen.port
    })

    return sock
  }
}

/**
  * Sends a UDP command to a UHPPOTE access controller and returns the decoded
  * reply, for use by 'get' and 'set'.
  *
  * @param {object}   context  Addresses, logger, debug, etc.
  * @param {byte}     op       Operation code from 'opcode' module
  * @param {object}   request  Operation parameters for use by codec.encode
  * @param {function} receive  Handler for received messages
  *
  * @return {object}  Decoded reply from access controller
  */
async function udp (ctx, op, request, receive) {
  const sock = dgram.createSocket(opts)
  const rq = codec.encode(op, ctx.deviceId, request)

  const onerror = new Promise((resolve, reject) => {
    sock.on('error', (err) => {
      reject(err)
    })
  })

  const send = new Promise((resolve, reject) => {
    sock.on('listening', () => {
      if (ctx.forceBroadcast || isBroadcast(ctx.addr.address)) {
        sock.setBroadcast(true)
      }

      sock.send(new Uint8Array(rq), 0, 64, ctx.addr.port, ctx.addr.address, (err, bytes) => {
        if (err) {
          reject(err)
        } else {
          log(ctx.debug, 'sent', rq, ctx.addr)
          resolve(bytes)
        }
      })
    })

    sock.bind({
      address: ctx.bind,
      port: 0
    })
  })

  sock.on('message', (message, rinfo) => {
    log(ctx.debug, 'received', message, rinfo)

    receive.received(new Uint8Array(message))
  })

  try {
    const result = await Promise.race([onerror, Promise.all([receive, send])])

    if (result && result.length === 2) {
      return result[0]
    }
  } finally {
    sock.close()
    receive.cancel()
  }

  throw errors.NoReply(ctx.locale)
}

/**
  * Opens a TCP connection to the destination addres, sends the command and returns the decoded
  * reply, for use by 'get' and 'set'.
  *
  * @param {object}   context  Addresses, logger, debug, etc.
  * @param {byte}     op       Operation code from 'opcode' module
  * @param {object}   request  Operation parameters for use by codec.encode
  * @param {function} receive  Handler for received messages
  *
  * @return {object}  Decoded reply from access controller
  */
async function tcp (ctx, dest, op, request, receive) {
  const sock = new net.Socket()
  const rq = codec.encode(op, ctx.deviceId, request)

  const onerror = new Promise((resolve, reject) => {
    sock.on('error', (err) => {
      reject(err)
    })
  })

  const send = new Promise((resolve, reject) => {
    sock.on('connect', () => {
      sock.write(new Uint8Array(rq), (err) => {
        if (err) {
          reject(err)
        } else {
          log(ctx.debug, 'TCP::sent', rq, dest)
          resolve()
        }
      })
    })

    sock.connect(dest)

    sock.on('data', (message) => {
      log(ctx.debug, 'TCP::received', message)

      receive.received(new Uint8Array(message))
    })
  })

  try {
    const result = await Promise.race([onerror, Promise.all([receive, send])])

    if (result && result.length === 2) {
      return result[0]
    }
  } finally {
    sock.end()
    receive.cancel()
  }

  throw errors.NoReply(ctx.locale)
}

/**
  * Utility function to reconcile supplied configuration against the default
  * values. Returns a working 'exec' context with valid:
  * - UDP bind address:port
  * - UDP destination address:port
  * - timeout
  * - debug enabled
  *
  * @param {number}   device   The serial number for the target access controller
  * @param {object}   config   Configuration object supplied to requesting node
  * @param {function} logger   Log function for sent/received messages
  *
  * @param {object} Valid working context
  */
function context (device, config, logger, locale) {
  const deviceId = Number(device)
  let timeout = 5000
  let bind = '0.0.0.0'
  let dest = '255.255.255.255:60000'
  let listen = '0.0.0.0:60001'
  let forceBroadcast = false
  let debug = false

  if (config) {
    timeout = config.timeout
    bind = config.bind
    dest = config.broadcast
    listen = config.listen
    debug = config.debug ? function (l, m) { logger(l + '\n' + m) } : null

    if (config.controllers && config.controllers.has(device)) {
      device = config.controllers.get(device)
      for (const [k, v] of Object.entries(device)) {
        if (k === 'address') {
          dest = v
        } else if (k === 'forceBroadcast') {
          forceBroadcast = v
        }
      }
    }
  }

  return {
    deviceId,
    timeout,
    bind,
    addr: stringToIP(dest),
    listen: stringToIP(listen),
    forceBroadcast,
    locale,
    debug
  }
}

/**
  * Utility function to write a sent/received UDP message to the log function.
  *
  * @param {function}   debug  The log function that will write the formatted message
  * @param {string}     label  'sent' or 'received'
  * @param {uint8array} message 64 byte UDP message
  * @param {object}     rinfo   source/destination IP address and port
  */
function log (debug, label, message, rinfo) {
  let description = label

  if (rinfo) {
    description = `${label} ${rinfo.address}:${rinfo.port}`
  }

  if (debug) {
    if (typeof debug === 'function') {
      const pad = ' '.repeat(25)
      debug(description, pad + format(message, pad))
    } else {
      const prefix = ' '.repeat(18)
      const pad = ' '.repeat(26)
      console.log(prefix + '[debug] ' + description + '\n' + pad + format(message, pad))
    }
  }
}

/**
  * Utility function to format a 64 byte UDP message.
  *
  * @param {uint8array} message 64 byte UDP message
  * @param {string}     pad     prefix used to align the message to the log entries
  *
  * @returns {string} Message formatted as a hexadecimal chunk
  */
function format (message, pad) {
  return message
    .toString('hex')
    .replace(/(.{2})/g, '$& ')
    .replace(/(.{24})/g, '$& ')
    .replace(/(.{50})/g, '$&\n' + pad)
    .trimEnd()
}

/**
  * Utility function to convert an IP address in host:port format an object with
  * address and port.
  *
  * @param {string} addr  IP address in host:port format
  *
  * @returns {object} Object containing IP address and port as properties
  */
function stringToIP (addr) {
  let address = addr
  let port = 60000

  const re = /^(.*?)(?::([0-9]+))?$/
  const match = addr.match(re)

  if ((match.length > 1) && match[1]) {
    address = match[1]
  }

  if ((match.length > 2) && match[2]) {
    port = parseInt(match[2], 10)
  }

  return {
    address,
    port
  }
}

/**
  * Utility function that takes a best guess as to whether an IP address is likely to be
  * a broadcast address. It uses the OS interface list, returning 'true' if the address
  * matches one of the 'bit flipped' netmasks.
  *
  * @param {string} addr  IP address
  *
  * @returns {bool} 'true' if the address is a broadcast address. Defaults to 'false'.
  */
function isBroadcast (addr) {
  const interfaces = os.networkInterfaces()

  for (const v of Object.entries(interfaces)) {
    for (const ifs of v[1]) {
      if (ifs.family && ifs.family === 'IPv4') {
        const subnet = ip.subnet(ifs.address, ifs.netmask)

        if (subnet.broadcastAddress === addr) {
          return true
        }
      }
    }
  }

  return false
}

/**
  * Utility function construct a Promise that can resolves on receiving a single reply. Used by 'get' and 'set'.
  *
  * @param {number} timeout  Timeout (in seconds). Ignored if 'undefined' (e.g. for send() which does not expect
  *                          a reply)
  *
  * @returns {promise} Constructed Promised with a 'received' function.
  */
function receiveAny (timeout, locale) {
  let timer = null
  let f = null

  const p = new Promise((resolve, reject) => {
    f = resolve
    if (timeout) {
      timer = setTimeout(() => { reject(errors.Timeout(locale)) }, timeout)
    }
  })

  p.cancel = () => {
    if (timer) {
      clearTimeout(timer)
    }
  }

  p.received = (message) => {
    if (timer) {
      clearTimeout(timer)
    }

    if (f) {
      f(message)
    }
  }

  return p
}

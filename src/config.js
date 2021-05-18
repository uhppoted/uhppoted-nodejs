function Config (name, bindAddr, broadcastAddr, listenAddr, timeout, debug) {
  this.name = 'uhppoted'
  this.bind = '0.0.0.0'
  this.broadcast = '255.255.255.255:60000'
  this.listen = '0.0.0.0:60001'
  this.timeout = 5000
  this.debug = false

  if (name) {
    this.name = name
  }

  if (bindAddr) {
    this.bind = bindAddr
  }

  if (broadcastAddr) {
    this.broadcast = broadcastAddr
  }

  if (listenAddr) {
    this.listen = listenAddr
  }

  if (debug) {
    this.debug = debug
  }

  if (timeout && !Number.isNaN(timeout) && timeout >= 0 && timeout < 60000) {
    this.timeout = timeout
  }
}

module.exports = {
  Config
}

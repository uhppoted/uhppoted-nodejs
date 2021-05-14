function Config (name, bindAddr, broadcastAddr, listenAddr, debug) {
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

  this.setBindAddr = function (address) {
    this.bind = address
  }

  this.setBroadcastAddr = function (address) {
    this.broadcast = address
  }

  this.setListenAddr = function (address) {
    this.listen = address
  }
}

module.exports = {
  Config
}

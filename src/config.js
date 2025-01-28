function Config(
  name,
  bindAddr,
  broadcastAddr,
  listenAddr,
  timeout,
  controllers,
  debug,
) {
  this.name = 'uhppoted'
  this.bind = '0.0.0.0'
  this.broadcast = '255.255.255.255:60000'
  this.listen = '0.0.0.0:60001'
  this.timeout = 5000
  this.controllers = new Map()
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

  if (controllers && Array.isArray(controllers)) {
    controllers.forEach((c) => {
      if (c.deviceId && !Number.isNaN(c.deviceId) && c.deviceId > 0) {
        const object = {}

        for (const [k, v] of Object.entries(c)) {
          if (k === 'address') {
            object.address = v
          } else if (k === 'forceBroadcast') {
            object.forceBroadcast = v
          }
        }

        this.controllers.set(c.deviceId, object)
      }
    })
  }

  if (debug) {
    this.debug = debug
  }

  if (timeout && !Number.isNaN(timeout) && timeout >= 0 && timeout < 60000) {
    this.timeout = timeout
  }
}

function addDevice(config, deviceId, address, forceBroadcast) {
  if (config && deviceId) {
    const id = parseInt(deviceId.toString(), 10)

    if (id && !Number.isNaN(id) && id > 0) {
      const controller = {
        address: '',
        forceBroadcast: false,
      }

      if (address) {
        controller.address = address.toString()
      }

      if (forceBroadcast && forceBroadcast.toString() === 'true') {
        controller.forceBroadcast = true
      }

      config.controllers.set(id, controller)
    }
  }
}

module.exports = {
  Config,
  addDevice,
}

module.exports = {
  Config: require('./src/config.js').Config,

  getDevices: require('./src/get-devices.js'),
  getDevice: require('./src/get-device.js'),
  setIP: require('./src/set-ip.js'),
  getListener: require('./src/get-listener.js'),
  setListener: require('./src/set-listener.js'),
  getStatus: require('./src/get-status.js'),
  getTime: require('./src/get-time.js'),
  setTime: require('./src/set-time.js'),

  listen: require('./src/listen.js')
}

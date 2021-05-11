module.exports = {
  Config: require('./src/config.js').Config,

  getDevices: require('./src/get-devices.js'),
  getDevice: require('./src/get-device.js'),
  getStatus: require('./src/get-status.js'),
  getTime: require('./src/get-time.js'),
  setTime: require('./src/set-time.js'),
  setAddress: require('./src/set-address.js')
}

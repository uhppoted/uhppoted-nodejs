const config = require('./src/config.js')
const getDevices = require('./src/get-devices.js')
const getDevice = require('./src/get-device.js')

module.exports = {
  Config: config.Config,
  GetDevices: getDevices,
  GetDevice: getDevice
}

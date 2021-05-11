const config = require('./src/config.js')
const getDevices = require('./src/get-devices.js')
const getDevice = require('./src/get-device.js')
const getStatus = require('./src/get-status.js')
const setAddress = require('./src/set-address.js')

module.exports = {
  Config: config.Config,

  getDevices: getDevices,
  getDevice: getDevice,
  getStatus: getStatus,
  setAddress: setAddress
}

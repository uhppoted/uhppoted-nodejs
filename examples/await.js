const uhppoted = require('uhppoted')
const ctx = require('./common.js')

async function GetDevices(_id) {
  const devices = new Map()
  const response = await uhppoted.getDevices(ctx)

  response.forEach((v) => {
    devices.set(v.deviceId, v.device.address)
  })

  return devices
}

;(async () => {
  console.log('DEVICES: ', await GetDevices())
})()

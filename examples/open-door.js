const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const door = 1

uhppoted.openDoor(ctx, deviceID, door)
  .then(response => {
    console.log(response)
  })
  .catch(err => console.log(err))

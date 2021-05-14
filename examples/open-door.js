const uhppoted = require('uhppoted')
const ctx = require('./common.js')
const door = 1

uhppoted.openDoor(ctx, 405419896, door)
  .then(response => {
    console.log(response)
  })
  .catch(err => console.log('ERROR', err))

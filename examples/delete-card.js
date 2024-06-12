const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const card = 8165538

async function run () {
  await uhppoted.deleteCard(ctx, deviceID, card)
    .then(response => {
      console.log('\ndelete-card:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.deleteCard(ctx, { id: deviceID, address: addr, protocol: 'tcp' }, card)
    .then(response => {
      console.log('\ndelete-card:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

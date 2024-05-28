const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'

async function run () {
  await uhppoted.refreshTaskList(ctx, deviceID)
    .then(response => {
      console.log('\nrefresh-task-list:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.refreshTaskList(ctx, { controller: deviceID, address: addr, protocol: 'tcp' })
    .then(response => {
      console.log('\nrefresh-task-list:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

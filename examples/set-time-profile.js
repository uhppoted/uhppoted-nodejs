const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const profile = {
  id: 29,
  valid: { from: '2021-01-01', to: '2021-12-31' },
  weekdays: ['Monday', 'Wednesday', 'Friday'],
  segments: [
    { start: '08:30', end: '11:45' },
    { start: '13:15', end: '17:25' }
  ],
  linkedTo: 3
}

async function run () {
  await uhppoted.setTimeProfile(ctx, deviceID, profile)
    .then(response => {
      console.log('\nset-time-profile:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.setTimeProfile(ctx, { controller: deviceID, address: addr, protocol: 'tcp' }, profile)
    .then(response => {
      console.log('\nset-time-profile:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()

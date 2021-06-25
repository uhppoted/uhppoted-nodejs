const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const task = {
  task: 'enable time profile',
  door: 3,
  valid: { from: '2021-01-01', to: '2021-12-31' },
  weekdays: ['Monday', 'Wednesday', 'Friday'],
  start: '08:30'
}

uhppoted.addTask(ctx, deviceID, task)
  .then(response => {
    console.log('\nadd-task:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })

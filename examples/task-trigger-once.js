const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const task = {
  task: 'trigger once',
  door: 3,
  valid: { from: '2021-01-01', to: '2021-12-31' },
  weekdays: ['Monday', 'Wednesday', 'Friday'],
  start: '10:51'
}

uhppoted.clearTaskList(ctx, deviceID)
  .then(response => { return console.log('\nclear-task-list:\n', response) })
  .then(() => { return uhppoted.addTask(ctx, deviceID, task) })
  .then(response => { return console.log('\nadd-task:\n', response) })
  .then(() => { return uhppoted.refreshTaskList(ctx, deviceID) })
  .then(response => { return console.log('\nrefresh-task-list:\n', response) })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })
